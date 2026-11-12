import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import App from './App';

const puzzle = {
  id: 42,
  groupPos: ['warm', 'heat', 'sun'],
  groupNeg: ['cold', 'frost', 'ice'],
};
const response = data => ({ ok: true, json: async () => data });
const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
  document.cookie.split(';').forEach(cookie => {
    document.cookie = cookie.split('=')[0].trim() + '=;max-age=0;path=/';
  });
});

afterEach(() => {
  toast.dismiss();
  global.fetch = originalFetch;
});

test('guessing stays disabled until a puzzle is loaded', () => {
  global.fetch.mockReturnValue(new Promise(() => {}));
  const { container } = render(<App />);
  const input = screen.getByPlaceholderText('find a word...');
  fireEvent.change(input, { target: { value: 'summer' } });
  expect(container.querySelector('button[type="submit"]')).toBeDisabled();
  fireEvent.submit(input.closest('form'));
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('a failed puzzle request can be retried', async () => {
  global.fetch.mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce(response(puzzle));
  const { container } = render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the puzzle');
  fireEvent.click(screen.getByRole('button', { name: 'Retry puzzle' }));
  await screen.findByText('warm');
  fireEvent.change(screen.getByPlaceholderText('find a word...'), { target: { value: 'summer' } });
  expect(container.querySelector('button[type="submit"]')).toBeEnabled();
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test.each(['network', 'non-JSON HTTP error', 'JSON HTTP error'])(
  '%s while checking a guess allows the same guess to be retried', async failure => {
    global.fetch.mockResolvedValueOnce(response(puzzle));
    if (failure === 'network') {
      global.fetch.mockRejectedValueOnce(new Error('offline'));
    } else if (failure === 'non-JSON HTTP error') {
      global.fetch.mockResolvedValueOnce({ ok: false, json: async () => { throw new SyntaxError('HTML error response'); } });
    } else {
      global.fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'server failure' }) });
    }
    global.fetch.mockResolvedValueOnce(response({ score: 2, topWords: ['warm', 'heat', 'cold'] }));
    const { container } = render(<App />);
    await screen.findByText('warm');
    const input = screen.getByPlaceholderText('find a word...');
    fireEvent.change(input, { target: { value: 'summer' } });
    fireEvent.submit(input.closest('form'));
    await screen.findByText('Could not check your word. Please try again.');
    await waitFor(() => expect(container.querySelector('button[type="submit"]')).toBeEnabled());
    expect(input).toHaveValue('summer');
    fireEvent.submit(input.closest('form'));
    await screen.findByText('results');
    expect(global.fetch).toHaveBeenCalledTimes(3);
  }
);

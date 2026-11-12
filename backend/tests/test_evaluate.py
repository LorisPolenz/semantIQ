"""Regression tests using only the Python standard library.

Run: python -m unittest discover -s backend/tests -p 'test_evaluate.py'

The import stubs avoid optional dependencies, application initialization,
credentials, disk caching, and paid model calls while testing the real source.
"""

import importlib.util
import sys
import types
import unittest
from pathlib import Path
from unittest import mock


class EvaluateTests(unittest.TestCase):
    def setUp(self):
        self.model = mock.Mock()
        self.validate = mock.Mock(return_value=True)
        self.log = mock.Mock()
        modules = {}
        for name, attributes in {
            "semantiq": {},
            "flask": {"jsonify": lambda payload: payload},
            "semantiq.validate": {"validate_user_input": self.validate},
            "semantiq.metrics": {
                "log_evaluate": self.log,
                "log_get_puzzle": mock.Mock(),
            },
            "semantiq.chatgpt": {"chatgpt": self.model},
        }.items():
            module = types.ModuleType(name)
            vars(module).update(attributes)
            modules[name] = module
        modules["semantiq"].__path__ = []
        path = Path(__file__).resolve().parents[1] / "semantiq" / "evaluate.py"
        spec = importlib.util.spec_from_file_location("evaluate_under_test", path)
        self.evaluate = importlib.util.module_from_spec(spec)
        with mock.patch.dict(sys.modules, modules):
            spec.loader.exec_module(self.evaluate)
        self.puzzle = {
            "groupNeg": ["cold", "frost", "ice"],
            "groupPos": ["warm", "heat", "sun"],
        }
        self.ranking = ["warm", "heat", "cold", "sun", "frost", "ice"]

    def test_accepts_complete_permutation_in_model_order(self):
        self.model.return_value = ", ".join(self.ranking)

        self.assertEqual(
            self.evaluate.evaluate_with_gpt(self.puzzle, "summer"), self.ranking
        )
        self.model.assert_called_once()
        self.assertEqual(self.puzzle["groupNeg"], ["cold", "frost", "ice"])
        self.assertEqual(self.puzzle["groupPos"], ["warm", "heat", "sun"])

    def test_trims_whitespace_around_comma_separated_words(self):
        self.model.return_value = """ 'warm' ,\theat,\n cold ,"sun", frost,ice """

        self.assertEqual(
            self.evaluate.evaluate_with_gpt(self.puzzle, "summer"), self.ranking
        )
        self.model.assert_called_once()

    def test_retries_invalid_rankings(self):
        invalid_rankings = [
            "warm, warm, warm, cold, frost, ice",
            "warm, heat, cold",
            "warm, heat, cold, sun, frost, ice, warm",
            "warm, heat, cold, sun, frost, unknown",
            "warm, heat, cold, sun, frost, ice,",
            "",
        ]
        for response in invalid_rankings:
            with self.subTest(response=response):
                self.model.reset_mock()
                self.model.side_effect = [response, ", ".join(self.ranking)]

                self.assertEqual(
                    self.evaluate.evaluate_with_gpt(self.puzzle, "summer"),
                    self.ranking,
                )
                self.assertEqual(self.model.call_count, 2)
                self.assertEqual(
                    [call.kwargs for call in self.model.call_args_list],
                    [{"temperature": 0.0, "seed": 0}, {"temperature": 0.1, "seed": 1}],
                )

    def test_invalid_rankings_exhaust_original_retry_policy(self):
        self.model.return_value = "warm, warm, warm, cold, frost, ice"

        with self.assertRaisesRegex(ValueError, "GPT failed to return valid words"):
            self.evaluate.evaluate_with_gpt(self.puzzle, "summer")

        self.assertEqual(self.model.call_count, 10)
        prompt = self.model.call_args_list[0].args[0]
        for attempt, call in enumerate(self.model.call_args_list):
            self.assertEqual(call.args, (prompt,))
            self.assertEqual(call.kwargs, {"temperature": 0.1 * attempt, "seed": attempt})

    def test_scores_only_the_first_three_valid_ranked_words(self):
        self.model.side_effect = [
            "warm, warm, warm, cold, frost, ice",
            ", ".join(self.ranking),
        ]

        self.assertEqual(
            self.evaluate.evaluate(self.puzzle, "SUMMER"),
            {"score": 2, "topWords": ["warm", "heat", "cold"]},
        )
        self.validate.assert_called_once_with("summer")
        self.log.assert_called_once_with("summer", 2, True)
        self.assertEqual(self.model.call_count, 2)


if __name__ == "__main__":
    unittest.main()

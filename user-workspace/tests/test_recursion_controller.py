import unittest
import os
import sys
import json
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from recursion_controller import RecursionController

class TestRecursionController(unittest.TestCase):
    def setUp(self):
        self.goal_tracker_path = os.path.join(os.path.dirname(__file__), '../goal_tracker.json')
        # Backup existing goal_tracker.json if exists
        if os.path.exists(self.goal_tracker_path):
            os.rename(self.goal_tracker_path, self.goal_tracker_path + '.bak')
        # Initialize empty goal tracker
        with open(self.goal_tracker_path, 'w') as f:
            json.dump({"goals": ["Test Goal"], "progress": {"Test Goal": "In Progress"}}, f)
        self.controller = RecursionController()

    def tearDown(self):
        # Remove test goal_tracker.json
        if os.path.exists(self.goal_tracker_path):
            os.remove(self.goal_tracker_path)
        # Restore backup if exists
        if os.path.exists(self.goal_tracker_path + '.bak'):
            os.rename(self.goal_tracker_path + '.bak', self.goal_tracker_path)

    def test_analyze_progress(self):
        progress = self.controller.analyze_progress()
        self.assertIn("Test Goal", progress)
        self.assertEqual(progress["Test Goal"], "In Progress")

    def test_mutate_strategy(self):
        # This test just runs the method to ensure no exceptions
        self.controller.mutate_strategy()

if __name__ == '__main__':
    unittest.main()

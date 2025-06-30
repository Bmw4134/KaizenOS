import unittest
import os
import sys
import json
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from kaizen_core import KaizenCore

class TestKaizenCore(unittest.TestCase):
    def setUp(self):
        # Backup existing goal_tracker.json if exists
        self.goal_tracker_path = os.path.join(os.path.dirname(__file__), '../goal_tracker.json')
        if os.path.exists(self.goal_tracker_path):
            os.rename(self.goal_tracker_path, self.goal_tracker_path + '.bak')

        # Initialize empty goal tracker
        with open(self.goal_tracker_path, 'w') as f:
            json.dump({"goals": [], "progress": {}}, f)

        self.core = KaizenCore()

    def tearDown(self):
        # Remove test goal_tracker.json
        if os.path.exists(self.goal_tracker_path):
            os.remove(self.goal_tracker_path)
        # Restore backup if exists
        if os.path.exists(self.goal_tracker_path + '.bak'):
            os.rename(self.goal_tracker_path + '.bak', self.goal_tracker_path)

    def test_add_goal(self):
        self.core.add_goal("Test Goal")
        self.assertIn("Test Goal", self.core.get_goals())
        self.assertEqual(self.core.get_progress("Test Goal"), "Not started")

    def test_update_progress(self):
        self.core.add_goal("Test Goal")
        self.core.update_progress("Test Goal", "In Progress")
        self.assertEqual(self.core.get_progress("Test Goal"), "In Progress")

if __name__ == '__main__':
    unittest.main()

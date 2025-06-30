"""
kaizen_core.py

Core logic for KaizenOS backend including goal management,
task orchestration, and integration with recursive agents.
"""

import json
import os
from typing import Dict, Any, List

GOAL_TRACKER_PATH = os.path.join(os.path.dirname(__file__), 'goal_tracker.json')

class KaizenCore:
    def __init__(self):
        self.goals = self.load_goals()

    def load_goals(self) -> Dict[str, Any]:
        if os.path.exists(GOAL_TRACKER_PATH):
            with open(GOAL_TRACKER_PATH, 'r') as f:
                return json.load(f)
        else:
            return {"goals": [], "progress": {}}

    def save_goals(self):
        with open(GOAL_TRACKER_PATH, 'w') as f:
            json.dump(self.goals, f, indent=2)

    def add_goal(self, goal: str):
        if goal not in self.goals["goals"]:
            self.goals["goals"].append(goal)
            self.goals["progress"][goal] = "Not started"
            self.save_goals()

    def update_progress(self, goal: str, status: str):
        if goal in self.goals["progress"]:
            self.goals["progress"][goal] = status
            self.save_goals()

    def get_goals(self) -> List[str]:
        return self.goals["goals"]

    def get_progress(self, goal: str) -> str:
        return self.goals["progress"].get(goal, "Unknown")

if __name__ == "__main__":
    core = KaizenCore()
    core.add_goal("Initial KaizenOS setup")
    print("Current goals:", core.get_goals())

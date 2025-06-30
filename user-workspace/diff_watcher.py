"""
diff_watcher.py

Watches file system changes and tracks diffs for KaizenOS recursive feedback integration.
"""

import os
import time
import hashlib
from typing import Dict

class DiffWatcher:
    def __init__(self, watch_dir: str):
        self.watch_dir = watch_dir
        self.file_hashes: Dict[str, str] = {}

    def hash_file(self, filepath: str) -> str:
        hasher = hashlib.sha256()
        with open(filepath, 'rb') as f:
            buf = f.read()
            hasher.update(buf)
        return hasher.hexdigest()

    def scan_files(self):
        changed_files = []
        for root, _, files in os.walk(self.watch_dir):
            for file in files:
                filepath = os.path.join(root, file)
                try:
                    current_hash = self.hash_file(filepath)
                    old_hash = self.file_hashes.get(filepath)
                    if old_hash != current_hash:
                        self.file_hashes[filepath] = current_hash
                        changed_files.append(filepath)
                except Exception as e:
                    print(f"Error hashing file {filepath}: {e}")
        return changed_files

    def watch(self, interval: float = 5.0):
        print(f"Starting diff watcher on {self.watch_dir} with interval {interval}s")
        while True:
            changed = self.scan_files()
            if changed:
                print(f"Detected changes in files: {changed}")
                # Here you could trigger feedback integration or logging
            time.sleep(interval)

if __name__ == "__main__":
    watcher = DiffWatcher(os.path.dirname(os.path.abspath(__file__)))
    watcher.watch()

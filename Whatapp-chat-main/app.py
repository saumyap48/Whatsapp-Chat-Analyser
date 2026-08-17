import sys
import os

# Add repository root directory to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

# Execute the primary root app.py
root_app_path = os.path.join(root_dir, "app.py")
with open(root_app_path, "r", encoding="utf-8") as f:
    code = compile(f.read(), root_app_path, "exec")
    exec(code)

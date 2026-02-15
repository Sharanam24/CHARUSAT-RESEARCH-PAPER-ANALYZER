"""
Setup Verification Script
Checks if all dependencies are installed
"""

import sys

print("=" * 60)
print("CHARUSAT Research Analyzer - Setup Verification")
print("=" * 60)

required_packages = [
    ("fastapi", "FastAPI web framework"),
    ("uvicorn", "ASGI server"),
    ("pydantic", "Data validation"),
    ("pymongo", "MongoDB driver"),
    ("motor", "Async MongoDB driver"),
    ("requests", "HTTP library"),
    ("sklearn", "Machine Learning (scikit-learn)"),
    ("numpy", "Numerical computing"),
    ("Levenshtein", "String similarity (python-Levenshtein)"),
]

print("\nChecking required packages...\n")

missing_packages = []
installed_packages = []

for package, description in required_packages:
    try:
        __import__(package)
        print(f"✅ {package:20s} - {description}")
        installed_packages.append(package)
    except ImportError:
        print(f"❌ {package:20s} - {description} (NOT INSTALLED)")
        missing_packages.append(package)

print("\n" + "=" * 60)

if missing_packages:
    print(f"\n⚠️  Missing {len(missing_packages)} package(s)")
    print("\nTo install missing packages, run:")
    print("\n    pip install -r requirements.txt")
    print("\nOr install individually:")
    for pkg in missing_packages:
        if pkg == "sklearn":
            print(f"    pip install scikit-learn")
        elif pkg == "Levenshtein":
            print(f"    pip install python-Levenshtein")
        else:
            print(f"    pip install {pkg}")
else:
    print(f"\n✅ All {len(installed_packages)} required packages are installed!")
    print("\nYour backend is ready to run!")
    print("\nNext steps:")
    print("1. Start MongoDB: mongod")
    print("2. Run server: python main.py")
    print("3. Access API docs: http://localhost:8000/docs")

print("\n" + "=" * 60)

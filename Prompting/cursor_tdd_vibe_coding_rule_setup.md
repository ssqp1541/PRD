# TDD vibe coding rule setup
_Exported on 12/15/2025 at 10:17:39 GMT+9 from Cursor (2.1.50)_

---

**User**

Cursor Rule: AI-Assisted TDD + Vibe Coding Workflow

아래내용을그대로.cursor/rules/tdd_vibe_coding.json 파일로 저장하면 됩니다.

C:\DEV\SamsungDisplay\Week_2\Cursor_pro\CursorRule /

├─src/

├─tests/

├─docs/

├─.cursor/

│ └─rules/

│ └─tdd_vibe_coding.json

├─.cursorignore

└─README.md

형식으로 폴더 구조를 만들어줘

---

**Cursor**


폴더 구조 확인 후 필요한 디렉토리와 파일 생성 중.



폴더 구조 생성 및 `tdd_vibe_coding.json` 파일 생성 중.


```json
{
  "name": "AI-Assisted TDD + Vibe Coding Workflow",
  "version": "1.0.0",
  "description": "Cursor Rule for Test-Driven Development with Vibe Coding approach",
  "rules": {
    "tdd_workflow": {
      "red_green_refactor": {
        "red": "Write a failing test first",
        "green": "Write minimal code to make test pass",
        "refactor": "Improve code while keeping tests green"
      },
      "test_first": "Always write tests before implementation",
      "test_coverage": "Maintain high test coverage for critical paths"
    },
    "vibe_coding": {
      "iterative_development": "Build features iteratively with continuous feedback",
      "rapid_prototyping": "Create working prototypes quickly",
      "user_feedback": "Incorporate user feedback early and often"
    },
    "file_structure": {
      "source_code": "src/",
      "tests": "tests/",
      "documentation": "docs/"
    },
    "best_practices": {
      "clean_code": "Write clean, readable, and maintainable code",
      "documentation": "Keep documentation up to date",
      "version_control": "Commit frequently with meaningful messages"
    }
  }
}

```

```ignore
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc

# Build outputs
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Environment
.env
.env.local

```

```markdown
# Cursor Rule: AI-Assisted TDD + Vibe Coding Workflow

This project follows a Test-Driven Development (TDD) approach combined with Vibe Coding principles.

## Project Structure

```
├─src/          # Source code
├─tests/        # Test files
├─docs/         # Documentation
├─.cursor/      # Cursor IDE rules
│ └─rules/
│   └─tdd_vibe_coding.json
├─.cursorignore # Files to ignore in Cursor
└─README.md
```

## Workflow

### TDD Cycle
1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass the test
3. **Refactor**: Improve code while keeping tests green

### Vibe Coding
- Iterative development with continuous feedback
- Rapid prototyping
- Early user feedback integration

## Getting Started

1. Write tests first
2. Implement minimal code to pass tests
3. Refactor and improve
4. Repeat

```


폴더 구조 생성 완료. 생성된 구조 확인 중.



폴더 구조 생성 완료.

생성된 구조:
```
C:\DEV\PRD\CursorRule\
├─ src/
├─ tests/
├─ docs/
├─ .cursor/
│  └─ rules/
│     └─ tdd_vibe_coding.json
├─ .cursorignore
└─ README.md
```

생성된 파일:
- `.cursor/rules/tdd_vibe_coding.json` - AI-Assisted TDD + Vibe Coding Workflow 규칙 파일
- `.cursorignore` - Cursor에서 무시할 파일 목록
- `README.md` - 프로젝트 설명 및 워크플로우 가이드
- 각 디렉토리에 `.gitkeep` 파일 추가 (빈 디렉토리 유지용)

`tdd_vibe_coding.json`에는 TDD 워크플로우와 Vibe Coding 원칙이 포함되어 있습니다. 필요에 따라 내용을 수정하세요.

```plaintext
C:\DEV\PRD\CursorRule\
├─ src/
├─ tests/
├─ docs/
├─ .cursor/
│  └─ rules/
│     └─ tdd_vibe_coding.json
├─ .cursorignore
└─ README.md
```

---

**User**

@rules 에 파이썬 코딩 컨벤션에 대한 룰 예시를 작성해줘

---

**Cursor**


`.cursor/rules`에 파이썬 코딩 컨벤션 룰 파일을 추가합니다. 기존 파일을 확인한 뒤 새 파일을 생성합니다.



파이썬 코딩 컨벤션 룰 파일 생성 중.


```json
{
  "name": "Python Coding Conventions",
  "version": "1.0.0",
  "description": "Python coding style guide based on PEP 8 and best practices",
  "rules": {
    "code_style": {
      "indentation": {
        "use": "4 spaces per indentation level",
        "never": "Tabs or mixing tabs and spaces",
        "max_line_length": 88,
        "note": "Follow Black formatter default (88 chars) or PEP 8 (79 chars)"
      },
      "line_breaks": {
        "blank_lines": {
          "top_level": "2 blank lines between functions and classes",
          "method_level": "1 blank line between methods",
          "logical_sections": "Use blank lines to separate logical sections"
        },
        "line_continuation": "Use parentheses for line continuation, not backslashes"
      },
      "imports": {
        "order": [
          "1. Standard library imports",
          "2. Related third party imports",
          "3. Local application/library specific imports"
        ],
        "format": "One import per line",
        "grouping": "Separate groups with blank lines",
        "wildcard": "Never use 'from module import *'",
        "absolute_vs_relative": "Prefer absolute imports over relative imports"
      }
    },
    "naming_conventions": {
      "variables": "Use snake_case (e.g., user_name, total_count)",
      "functions": "Use snake_case (e.g., calculate_total, get_user_data)",
      "classes": "Use PascalCase (e.g., UserAccount, DatabaseConnection)",
      "constants": "Use UPPER_SNAKE_CASE (e.g., MAX_RETRIES, API_BASE_URL)",
      "private": {
        "single_underscore": "Internal use (e.g., _internal_method)",
        "double_underscore": "Name mangling (e.g., __private_attr)",
        "note": "Avoid double underscore unless necessary for name mangling"
      },
      "special": {
        "dunder_methods": "Use double underscores (e.g., __init__, __str__)",
        "type_hints": "Use descriptive names for type variables (e.g., T, Key, Value)"
      }
    },
    "function_and_method_design": {
      "function_length": "Keep functions short and focused (ideally < 50 lines)",
      "parameters": {
        "max_parameters": "Limit to 3-4 parameters; use dataclasses or dicts for more",
        "default_values": "Mutable defaults should be None, then assign in function body",
        "example": "def func(items=None): items = items or []"
      },
      "return_values": {
        "consistency": "Return consistent types (don't mix None and values)",
        "early_returns": "Use early returns for guard clauses",
        "single_responsibility": "One function should do one thing"
      },
      "docstrings": {
        "style": "Use Google or NumPy style docstrings",
        "required_for": "All public functions, classes, and methods",
        "format": "Include description, parameters, return values, and exceptions"
      }
    },
    "class_design": {
      "organization": {
        "order": [
          "1. Class docstring",
          "2. __init__ method",
          "3. Public methods",
          "4. Private methods",
          "5. Class methods and static methods",
          "6. Properties"
        ]
      },
      "inheritance": {
        "prefer_composition": "Prefer composition over inheritance when possible",
        "multiple_inheritance": "Use sparingly and document clearly",
        "abstract_base_classes": "Use ABC for interfaces when appropriate"
      },
      "properties": "Use @property decorator for computed attributes",
      "dataclasses": "Use @dataclass for simple data containers (Python 3.7+)"
    },
    "error_handling": {
      "exceptions": {
        "be_specific": "Catch specific exceptions, not bare 'except:'",
        "order": "Catch more specific exceptions before general ones",
        "custom_exceptions": "Create custom exceptions for domain-specific errors"
      },
      "error_messages": "Provide clear, actionable error messages",
      "logging": "Use logging module instead of print statements for errors",
      "context_managers": "Use 'with' statements for resource management"
    },
    "type_hints": {
      "usage": "Use type hints for function parameters and return types",
      "optional": "Use Optional[Type] or Type | None for nullable types",
      "collections": "Use List[Type], Dict[Key, Value], Set[Type], Tuple[Type, ...]",
      "generics": "Use TypeVar and Generic for generic types",
      "typing_module": "Import from 'typing' module (Python 3.9+ can use built-in types)"
    },
    "code_quality": {
      "mutability": {
        "immutable_preferred": "Prefer immutable data structures when possible",
        "avoid_mutation": "Don't mutate function arguments unless necessary"
      },
      "comprehensions": {
        "list_comprehensions": "Use for simple transformations",
        "generator_expressions": "Use for large datasets to save memory",
        "readability": "Don't sacrifice readability for one-liners"
      },
      "lambda": "Use lambda for simple, one-line functions only",
      "decorators": "Use decorators for cross-cutting concerns (logging, caching, etc.)",
      "context_managers": "Use context managers for resource cleanup"
    },
    "testing": {
      "test_naming": "Test functions should start with 'test_'",
      "test_organization": "One test per behavior/requirement",
      "fixtures": "Use pytest fixtures for test setup and teardown",
      "mocking": "Mock external dependencies and I/O operations",
      "coverage": "Aim for >80% code coverage on critical paths"
    },
    "documentation": {
      "docstrings": {
        "modules": "Include module-level docstring explaining purpose",
        "classes": "Explain class purpose and usage",
        "functions": "Document parameters, return values, and exceptions"
      },
      "comments": {
        "why_not_what": "Explain 'why', not 'what' (code should be self-documenting)",
        "complex_logic": "Comment complex algorithms or business logic",
        "todo": "Use TODO comments for future improvements"
      },
      "type_hints": "Type hints serve as inline documentation"
    },
    "tools_and_formatters": {
      "formatter": "Use Black for code formatting",
      "linter": "Use flake8 or pylint for linting",
      "type_checker": "Use mypy for static type checking",
      "import_sorter": "Use isort for import organization",
      "pre_commit": "Set up pre-commit hooks for automated checks"
    },
    "performance": {
      "premature_optimization": "Don't optimize prematurely; profile first",
      "built_in_functions": "Prefer built-in functions and libraries",
      "generators": "Use generators for large datasets",
      "caching": "Use functools.lru_cache for expensive computations",
      "async": "Use async/await for I/O-bound operations"
    },
    "security": {
      "input_validation": "Always validate and sanitize user input",
      "secrets": "Never commit secrets or API keys to version control",
      "sql_injection": "Use parameterized queries, never string formatting",
      "eval_exec": "Avoid eval() and exec() with user input",
      "dependencies": "Keep dependencies updated and scan for vulnerabilities"
    }
  },
  "examples": {
    "good_function": {
      "code": "def calculate_total(items: List[Item], discount: float = 0.0) -> float:\n    \"\"\"Calculate total price with optional discount.\n    \n    Args:\n        items: List of items to calculate total for\n        discount: Discount percentage (0.0 to 1.0)\n    \n    Returns:\n        Total price after discount\n    \n    Raises:\n        ValueError: If discount is not between 0.0 and 1.0\n    \"\"\"\n    if not 0.0 <= discount <= 1.0:\n        raise ValueError(\"Discount must be between 0.0 and 1.0\")\n    \n    subtotal = sum(item.price for item in items)\n    return subtotal * (1 - discount)",
      "notes": [
        "Type hints for parameters and return value",
        "Default parameter value",
        "Comprehensive docstring",
        "Input validation",
        "Clear variable names",
        "Generator expression for efficiency"
      ]
    },
    "good_class": {
      "code": "class UserAccount:\n    \"\"\"Represents a user account in the system.\"\"\"\n    \n    def __init__(self, username: str, email: str) -> None:\n        self.username = username\n        self.email = email\n        self._is_active = True\n    \n    @property\n    def is_active(self) -> bool:\n        \"\"\"Check if account is active.\"\"\"\n        return self._is_active\n    \n    def deactivate(self) -> None:\n        \"\"\"Deactivate the user account.\"\"\"\n        self._is_active = False",
      "notes": [
        "PascalCase for class name",
        "Type hints in __init__",
        "Private attribute with underscore",
        "Property decorator for computed/controlled access"
      ]
    }
  }
}

```


`.cursor/rules/python_coding_conventions.json` 파일을 생성했습니다.

이 파일에는 다음이 포함되어 있습니다:

**주요 섹션:**
- **코드 스타일**: 들여쓰기, 줄바꿈, import 규칙
- **명명 규칙**: 변수, 함수, 클래스, 상수 등
- **함수/메서드 설계**: 파라미터, 반환값, docstring
- **클래스 설계**: 구조, 상속, dataclass 사용
- **에러 처리**: 예외 처리, 로깅, 컨텍스트 매니저
- **타입 힌트**: Optional, 제네릭, 컬렉션 타입
- **코드 품질**: 불변성, 컴프리헨션, 데코레이터
- **테스팅**: pytest 사용법
- **문서화**: docstring, 주석 가이드
- **도구**: Black, flake8, mypy 등
- **성능 & 보안**: 베스트 프랙티스

PEP 8과 일반적인 파이썬 베스트 프랙티스를 반영했습니다. Cursor에서 이 규칙을 참고해 코드를 작성할 수 있습니다.

---

**User**

@https://github.com/ssqp1541/PRD.git

"Rule 설정 완료" Commit 을 추가하고, 현재까지 내용을 업로드해줘

---

**Cursor**


Git 상태 확인 후 커밋하고 푸시합니다.



Git 저장소가 없습니다. 초기화 후 원격 저장소를 추가하고 커밋/푸시합니다.



작업 완료.

다음 작업을 수행했습니다:

1. Git 저장소 초기화
2. 원격 저장소 추가 (`https://github.com/ssqp1541/PRD.git`)
3. 모든 파일 스테이징
4. "Rule 설정 완료" 메시지로 커밋 생성
5. 원격 저장소에 푸시

**커밋된 파일들:**
- `.cursor/rules/python_coding_conventions.json`
- `.cursor/rules/tdd_vibe_coding.json`
- `.cursorignore`
- `README.md`
- `docs/.gitkeep`
- `src/.gitkeep`
- `tests/.gitkeep`

총 7개 파일이 커밋되어 GitHub 저장소에 업로드되었습니다. 저장소에서 확인할 수 있습니다.


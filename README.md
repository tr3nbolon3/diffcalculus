# Вычислитель отличий
[![Maintainability](https://api.codeclimate.com/v1/badges/b8db14f14eb3ce9cebcd/maintainability)](https://codeclimate.com/github/Haliont/project-lvl2-s281/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b8db14f14eb3ce9cebcd/test_coverage)](https://codeclimate.com/github/Haliont/project-lvl2-s281/test_coverage)
[![Build Status](https://travis-ci.org/Haliont/project-lvl2-s281.svg?branch=master)](https://travis-ci.org/Haliont/project-lvl2-s281)

CLI-приложение, принимает 2 файла, сравнивает их и выводит различия.

## Установка
```npm install -g diffcalculus```

## Использование
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:

  -V, --version  output the version number
  -f, --format   [type]  Output format
  -h, --help     output usage information
```

типы поддерживаемых файлов: *.ini, *.json, *.yml

типы вывода дифа: standart (по умолчанию), plain, json

## Использоание как библиотеки
```npm install --save-dev diffcalculus```
```
import genDiff from 'diffcalculus';
const diff = genDiff(<firstPathToFile>, <secondPathToFile>)
console.log(diff);
```

## Примеры вывода
### standart:
```
{
    common: {
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
  + follow: false
}
```

### plain:
```
Property 'timeout' was updated. From 50 to 20
Property 'proxy' was removed
Property 'follow' was removed
Property 'verbose' was added with value: true
```

### json:
```
[
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "updated",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "updated",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "value": {
      "abc": "12345"
    }
  }
]
```

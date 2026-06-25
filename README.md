# shape-lib

Библиотека для работы с геометрическими фигурами (прямоугольник, круг, треугольник) на TypeScript.
Фигуры являются источниками событий (`EventTarget`), вычисления возвращают `Promise`, а архитектура позволяет добавлять новые фигуры без изменения существующего кода.

## Возможности

- Три фигуры из коробки: `Rectangle`, `Circle`, `Triangle`.
- Расчёт площади и периметра (`area()`, `perimeter()`).
- Валидация параметров при создании (некорректные значения бросают `RangeError`).
- События об изменении фигуры через `EventTarget` (`addEventListener`).
- Фабрика с реестром (`ShapeCreate`) для создания фигур по строковому идентификатору.
- Строгая типизация (`strict: true`), компиляция без `any`.

## Установка

Библиотека поставляется в исходниках. Склонируйте репозиторий и соберите:

```bash
git clone <repository-url>
cd shape_lib
npm install
npm run build
```

Сборка попадёт в папку `dist/` (скомпилированный JavaScript + файлы деклараций `.d.ts`).

## Подключение

```typescript
import { Rectangle, Circle, Triangle } from "shape-lib";
```

## Использование

### Создание фигуры напрямую

Каждая фигура создаётся через конструктор, принимающий объект параметров:

```typescript
import { Rectangle, Circle, Triangle } from "shape-lib";

const rectangle = new Rectangle({ width: 10, height: 5 });
const circle = new Circle({ radius: 7 });
const triangle = new Triangle({ a: 3, b: 4, c: 5 });
```

### Расчёт площади и периметра

Методы `area()` и `perimeter()` асинхронны и возвращают `Promise<number>`:

```typescript
const area = await rectangle.area();          // 50
const perimeter = await rectangle.perimeter(); // 30

console.log(await circle.area());      // 153.93...
console.log(await circle.diameter);    // 14
```

### Получение параметров и идентификатора

У каждой фигуры есть неизменяемый идентификатор `kind` и геттер `params`:

```typescript
console.log(rectangle.kind);   // "rectangle"
console.log(rectangle.params); // { width: 10, height: 5 }
```

### Изменение параметров и события

При изменении параметра фигура диспатчит событие `change`. Можно подписаться через `addEventListener`:

```typescript
const circle = new Circle({ radius: 5 });

circle.addEventListener("change", (event) => {
  const { shape } = (event as CustomEvent).detail;
  console.log("Фигура изменилась:", shape.params);
});

circle.radius = 10; // вызовет событие "change"
```

### Создание через фабрику

`ShapeCreate` позволяет создавать фигуры по строковому идентификатору — удобно, когда тип фигуры известен только во время выполнения (например, при восстановлении из данных). Готовая фабрика со всеми фигурами доступна через `createDefaultShapes()`:

```typescript
import { createDefaultShapes } from "shape-lib";

const creator = createDefaultShapes();

const shape = await creator.create("rectangle", { width: 4, height: 6 });
console.log(await shape.area()); // 24

console.log(creator.kinds()); // ["rectangle", "circle", "triangle"]
```

Фабрика сама является источником событий и диспатчит `create` при создании фигуры:

```typescript
creator.addEventListener("create", (event) => {
  const { shape } = (event as CustomEvent).detail;
  console.log("Создана фигура:", shape.kind);
});
```

## Добавление новой фигуры

Архитектура построена так, что новая фигура добавляется без изменения существующего кода:

1. Создайте класс, наследующий `Shape`.
2. Реализуйте абстрактные члены: `area()`, `perimeter()`, геттер `params`.
3. Передайте идентификатор в `super(...)`.
4. Зарегистрируйте фигуру в фабрике через `creator.register(...)`.

Существующие фигуры при этом не затрагиваются.

## API

### `Shape` (абстрактный базовый класс)

| Член | Тип | Описание |
|---|---|---|
| `kind` | `string` (readonly) | Идентификатор типа фигуры |
| `params` | геттер | Параметры фигуры (только для чтения) |
| `area()` | `Promise<number>` | Площадь фигуры |
| `perimeter()` | `Promise<number>` | Периметр фигуры |

Наследует `EventTarget`: `addEventListener`, `removeEventListener`, `dispatchEvent`.

### Фигуры

- **`Rectangle`** — параметры `{ width, height }`. Дополнительно: геттеры/сеттеры `width`, `height`.
- **`Circle`** — параметры `{ radius }`. Дополнительно: геттер/сеттер `radius`, геттер `diameter`.
- **`Triangle`** — параметры `{ a, b, c }`. Проверяет неравенство треугольника при создании.

### `ShapeCreate` (фабрика)

| Метод | Описание |
|---|---|
| `register(kind, ctor)` | Зарегистрировать новую фигуру |
| `create(kind, params)` | Создать фигуру по идентификатору, возвращает `Promise<Shape>` |
| `kinds()` | Список зарегистрированных идентификаторов |

## Технические требования

- Node.js 19+ (используются глобальные `EventTarget` и `CustomEvent`).
- TypeScript компилируется со `strict: true` и `allowJs: false`.

## Лицензия

ISC
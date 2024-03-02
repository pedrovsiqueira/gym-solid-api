Why use repository pattern?
I am trying to understand the repository pattern. I have read a lot of articles and I understand the basic concept. But I am not able to understand why we should use the repository pattern.
I have read that it is used to decouple the data access layer from the business layer. But I am not able to understand why we need to decouple the data access layer from the business layer.
Can anyone explain why we should use the repository pattern?
If we ever want to remove prisma and use another ORM, we can do it easily by changing the repository implementation.


using SOLID principles, we can easily test our code.

D - Dependency Inversion Principle
Where did I use it? Writing tests this is the best advantage for me because I can easily mock the repository and test my business logic.

Tests - Using in memory tests is a great advantage. I can easily test my business logic without hitting the database. is a concept by Martin Fowler. It is a way to decouple the data access layer from the business layer. It is a way to achieve separation of concerns.


factory pattern. 

Fabrica de criação de coisas comuns que tem muitas dependências.


TDD - Test Driven Development.

Write a test first of business rules before implementing something, the test will help validate
if the implementation is okay or not.

//red state - error on the test
//green state - success.
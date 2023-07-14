```mermaid
---
title: Auth Service Database Design
---
erDiagram
    Token {
        int id PK
        string access_token UK
        int expires_in
        string refresh_token UK
        int refresh_expires_in
    }
```

```mermaid
flowchart LR
    %% Main Components
    auth((Auth Svc))
    auth-db[(Auth DB)]

    %% Connections with DB Layer
    auth -- Connect --> auth-db
```

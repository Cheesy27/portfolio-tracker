# Portfolio Tracker

A full-stack web application for tracking stock and fund holdings. Built with Java Spring Boot on the backend and React on the frontend, communicating through a REST API.

This project was built as part of a structured agile sprint, following the same workflow used by professional development teams — Jira for ticket management, Git branching conventions, and a CI/CD pipeline defined in a Jenkinsfile.

---

## Tech Stack

**Backend**
- Java 19
- Spring Boot 4.0.3
- Spring Data JPA
- Hibernate
- H2 In-Memory Database
- Maven

**Frontend**
- React 18
- Axios
- CSS3

**DevOps and Workflow**
- Git with feature branching strategy
- GitHub for version control and pull requests
- Jira for sprint and ticket management
- Jenkinsfile for CI/CD pipeline definition

---

## Project Architecture

The application is split into two independent layers that communicate over HTTP.

The backend is a Spring Boot REST API that handles all business logic and data persistence. It exposes three endpoints — GET, POST, and DELETE — under `/api/holdings`. Data is stored in an H2 in-memory database using JPA and Hibernate for object-relational mapping. The Holding entity is mapped to a database table automatically on startup, and a set of default holdings are inserted via a `data.sql` script.

The frontend is a React application that runs separately on port 3000. It uses Axios to make HTTP requests to the Spring Boot backend on port 8080. The UI is split into two components — an add holding form and a holdings table — both managed through React state and re-rendered automatically when data changes.

CORS is configured on the backend to allow requests from the React frontend during local development.

---

## Key Concepts

**REST API design** — the backend follows REST conventions. GET retrieves data, POST creates new records, and DELETE removes them. Each endpoint returns the appropriate HTTP status code (200, 201, 204, 404).

**Spring Data JPA** — instead of writing raw SQL, the application uses JPA repositories that provide built-in database operations. The `HoldingRepository` extends `JpaRepository` and gets save, findAll, and deleteById out of the box.

**Lombok** — the `@Data` annotation on the Holding entity auto-generates all getters, setters, and constructors at compile time, keeping the model class clean and readable.

**Dependency Injection** — Spring Boot automatically injects dependencies through constructor injection. The controller receives the service, and the service receives the repository — none of them create their own dependencies.

**React Hooks** — the frontend uses `useState` to manage component state and `useEffect` to fetch data from the backend when the component loads or when a new holding is added.

**Component-based architecture** — the UI is broken into reusable components. `AddHoldingForm` handles user input and submission, `HoldingsList` handles fetching and displaying data. Both are composed together in `App.js`.

**CI/CD Pipeline** — the Jenkinsfile defines a four-stage pipeline: checkout, build backend, run tests, and build frontend. This ensures every code change can be built and tested automatically in a shared environment.

---

## Getting Started

### Prerequisites

Make sure you have the following installed before running the project:

- Java 19 or higher — verify with `java -version`
- Maven 3.9 or higher — verify with `mvn -version`
- Node.js 18 or higher — verify with `node -version`
- npm — verify with `npm -version`

### Clone the Repository

```
git clone https://github.com/Cheesy27/portfolio-tracker.git
cd portfolio-tracker
```

### Running the Backend

Open a terminal and navigate to the backend folder:

```
cd backend
./mvnw spring-boot:run
```

The Spring Boot server will start on port 8080. You should see "Started PortfolioTrackerApplication" in the terminal when it is ready. The H2 database is created in memory on startup and pre-loaded with default Fidelity fund holdings automatically.

You can verify the backend is running by visiting:
```
http://localhost:8080/api/holdings
```

It should return a JSON array of the default holdings.

### Running the Frontend

Open a second terminal and navigate to the frontend folder:

```
cd frontend
npm install
npm start
```

The React app will start on port 3000 and open automatically in your browser at:
```
http://localhost:3000
```

Both the backend and frontend must be running at the same time for the application to work.

### Using the Application

Once both servers are running, you can:

- View all current holdings in the table on the main page
- Add a new holding by filling in the symbol, name, quantity, and purchase price fields and clicking Add Holding
- Delete any holding by clicking the Delete button on its row

---

## Agile Workflow

This project was built following a structured agile sprint using the same tools and conventions used by professional development teams.

**Jira** was used to plan and manage the work. All features were broken down into epics, stories, and tasks before any code was written. Each ticket was assigned story points and tracked through four board columns: To Do, In Progress, In Review, and Done.

**Git branching** followed a feature branch strategy. Every Jira ticket had a corresponding branch named after the ticket ID, for example `feature/PT-10-delete-holdings`. No code was committed directly to main or dev. All work went through a pull request.

**Pull Requests** were opened for every ticket when work was complete. Tickets were moved to In Review in Jira while the PR was open, and to Done after the PR was merged into the dev branch.

**Sprint 1** delivered the full MVP — a working backend API, a connected React frontend, default data on startup, and a Jenkinsfile for CI/CD.

---

## CI/CD Pipeline

The Jenkinsfile at the root of the repository defines a declarative pipeline with four stages:

1. Checkout — pulls the latest code from the repository
2. Build Backend — compiles the Spring Boot project using Maven
3. Test — runs the backend test suite
4. Build Frontend — installs npm dependencies and builds the React production bundle

The pipeline reports success or failure on completion.

---

## Challenges and How I Solved Them

**Package naming and file structure in Spring Boot**
Early on I created the model and repository files in the wrong directory, 
which caused VSCode to flag them as non-project files. The fix was 
understanding that Spring Boot requires all source files to live under the 
correct package path inside src/main/java. Once I moved the files to 
com/fcproject/portfolio_tracker and updated the package declarations at the 
top of each file to match, the errors cleared up.

**data.sql running before the table existed**
When I added default holdings through a data.sql file, the application crashed 
on startup. The issue was that Spring Boot was trying to run the SQL insert 
statements before Hibernate had finished creating the holdings table. The fix 
was adding spring.jpa.defer-datasource-initialization=true to 
application.properties, which tells Spring Boot to wait until JPA is fully 
initialized before running any SQL scripts.

**CORS blocking frontend requests**
When I first connected the React frontend to the Spring Boot backend, all 
requests were being blocked. This was a CORS issue — the browser was 
preventing the React app on port 3000 from making requests to the backend on 
port 8080 because they are on different ports. The fix was adding 
@CrossOrigin(origins = "http://localhost:3000") to the controller, which 
explicitly allows requests from the React frontend during local development.

**Git branch tracking**
Early in the project I ran into an issue pushing a new branch where Git 
returned a refspec error. The cause was trying to push a branch that had no 
commits on it yet. The fix was creating an empty initial commit using 
git commit --allow-empty before pushing, which taught me that Git requires 
at least one commit on a branch before it can be pushed to a remote repository.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/holdings | Returns all holdings |
| POST | /api/holdings | Creates a new holding |
| DELETE | /api/holdings/{id} | Deletes a holding by ID |

### Example POST request body

```json
{
  "symbol": "AAPL",
  "name": "Apple Inc",
  "quantity": 10,
  "purchasePrice": 150.00
}
```

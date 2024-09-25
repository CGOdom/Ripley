# Ripley

Access XenoHub front end here (deployed to GitHub Pages): https://cgodom.github.io/ripley-frontend

Access back end console here (deployed to codesandbox.io): https://codesandbox.io/p/github/CGOdom/Ripley/main?workspaceId=c2269905-2c5b-46de-b0e1-2ae9f4256df7

Front end code here: https://github.com/CGOdom/ripley-frontend

Back end code here: https://github.com/CGOdom/Ripley

## User Stories

### User Story 1: Category Filter on Dashboard
**As a user**, I want to be able to filter questions by category on the dashboard, so that I can easily find questions related to a specific topic.

#### Acceptance Criteria:
- A dropdown that lists all available categories.
- When a category is selected, the question list updates to show only questions from that category.

---

### User Story 2: Viewing a Question
**As a user**, I want to click on a question title to view the full question and its answers, so that I can engage with the discussion.

#### Acceptance Criteria:
- Clicking the question title should take the user to the question detail page.
- The detail page should display the full question, answers, and allow the user to post a response.

---

### User Story 3: Add a New Question
**As a logged-in user**, I want to be able to post a new question, so that I can seek help or share my thoughts with the community.

#### Acceptance Criteria:
- An “Add New Question” button should be visible on the dashboard.
- Clicking this button should open a form allowing the user to input a question title, body, and select a category.
- Submitting the form should add the question to the selected category and update the dashboard.

---

### User Story 4: Browse by Category
**As a user**, I want to browse all the questions in a specific category, so that I can view topics related to my interests.

#### Acceptance Criteria:
- The category list in the "Browse by Category" section should display all available categories.
- Clicking on a category name should take the user to a list of questions filtered by that category.

---

### User Story 5: User Authentication
**As a user**, I want to see my account information when logged in, so that I know which account I am using.

#### Acceptance Criteria:
- The header should display "Signed in as: [username]" when a user is logged in.
- The user should be able to log out by clicking the logout button.

---

### User Story 6: Access the Dashboard
**As a logged-in user**, I want to be able to navigate to the dashboard from anywhere in the app, so that I can quickly return to the main page.

#### Acceptance Criteria:
- The "Dashboard" link in the navigation menu should be clickable from any page.
- Clicking it should take the user back to the main dashboard.

---

### User Story 7: Add Question from Category Page
**As a user**, I want to be able to add a new question from the category page, so that I can contribute questions specific to that category.

#### Acceptance Criteria:
- When viewing questions by category, there should be an "Add New Question" button.
- The form should automatically pre-select the category based on the page the user is viewing.

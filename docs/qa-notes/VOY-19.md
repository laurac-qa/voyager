# VOY-19 – Create Trip

## User Story

> As a traveler, I want to create a trip so I can manage my travel plans.

---

## Requirement Questions

Questions to clarify with the Product Owner before development.

- [ ] Are duplicate trips allowed?
- [ ] What is the maximum length for **Title**?
- [ ] What is the maximum length for **Summary**?
- [ ] Are **Dates** mandatory?
- [ ] Should past trips be allowed?
- [ ] What should happen if the backend is unavailable?
- [ ] Should the **Save** button be disabled while saving?

---

## Risks

Potential areas where defects are most likely to occur.

| Risk | Impact |
|------|--------|
| Long text breaks the layout | UI |
| API failure leaves the user without feedback | Functional |
| Double-clicking **Save** creates duplicate trips | Data integrity |
| Unicode characters display incorrectly | Internationalization |
| Validation messages are inconsistent | Usability |

---

## Happy Path

1. Open the **Create Trip** page.
2. Enter valid trip information.
3. Click **Save**.
4. User is redirected to **My Trips**.
5. Newly created trip appears in the list.

---

## Negative Test Scenarios

- Empty title.
- Empty dates.
- Empty summary.
- Backend returns **HTTP 500**.
- Invalid date range (if not allowed).
- Duplicate trip (depending on business rules).

---

## Edge Cases

- 500-character title.
- Emoji (✈️🌴🏝️).
- Japanese destination (東京).
- Arabic destination (دبي).
- Leading/trailing spaces.
- Very long summary.
- Browser refresh during save.

---

## Automation Candidates

| Scenario | Automate |
|----------|:--------:|
| Happy path | ✅ |
| Required field validation | ✅ |
| Service unavailable | ✅ |
| Duplicate creation | ✅ |
| Successful redirect | ✅ |
| New trip displayed | ✅ |

---

## Notes

_To be updated during implementation if additional risks or edge cases are identified._
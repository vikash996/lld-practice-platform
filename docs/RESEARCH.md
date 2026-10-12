# Research note: structured low-level design practice

## Learner problem

Low-level design interviews ask learners to turn a brief into responsibilities, relationships, constraints, and trade-offs. A learner may know familiar patterns but still struggle to explain why a class owns a behavior, how objects collaborate, or what happens when an operation fails. Practice is most useful when it encourages a complete attempt and gives the learner a concrete next step while the reasoning is still fresh.

Research on programming feedback supports treating feedback as part of the learning interaction, while also warning that automated feedback is not one uniform technique. Keuning, Jeuring, and Heeren’s systematic review maps automated feedback approaches used in programming exercises and describes the variety of systems and feedback forms ([ACM TOCE, 2019](https://doi.org/10.1145/3341229)). The review motivates choosing feedback that is specific to the learner’s work rather than presenting a score alone. It does not establish that a small keyword rubric can assess software design quality.

More recent review work likewise shows a range from test-based feedback to machine-learning and language-model methods, with distinct implementation and evaluation trade-offs ([IEEE review, 2026](https://ieeexplore.ieee.org/document/11396629/)). A separate review of automated grading and feedback tools categorized 121 papers published from 2017–2021 and noted that most tools focused on correctness, with relatively few addressing maintainability, readability, or documentation ([Bisht et al., 2024](https://doi.org/10.1145/3636515)). These studies concern programming education broadly, not object-oriented design interview preparation specifically; applying their observations to this product is a reasoned product inference.

## Existing approaches and gaps

Common practice options include reading worked examples, watching walkthroughs, attempting a problem independently, and receiving peer or instructor review. Worked examples can make a solution legible but may encourage recognition instead of producing a design from a blank page. Independent attempts preserve learner agency but can leave a learner unsure what to inspect after finishing. Human review can address nuance, but is not always available on demand. Automated coding graders offer quick objective feedback for executable behavior; they are a poor fit for early architecture sketches where several designs can be reasonable.

The research literature documents many automated-feedback systems and evaluation methods, but does not imply that feedback from keyword matching is semantically reliable. The assignment’s scope favors an honest, inspectable baseline: a concise brief, guided open-text prompts, validation, and a rubric the learner can see in source. The interface names the evaluator as rule-based and calls its score a practice signal. It avoids fabricated claims of AI, correctness, or expert assessment.

## Product direction

The MVP focuses on three familiar systems: Parking Lot, Elevator System, and Vending Machine. Each brief lists requirements, constraints, and design considerations. Four answer prompts ask for classes and responsibilities, relationships, patterns, and trade-offs. A deterministic checklist gives a bounded score, calls out detected concepts, and suggests a next area to strengthen. Learners can revisit prior answers and feedback in the same browser.

This direction favors actionable transparency and low setup cost over deep evaluation. It is appropriate for a practice companion, not hiring decisions or formal grading. A future evidence-led direction would evaluate whether learners understand the rubric, whether suggestions change subsequent attempts, and whether the prompt set covers the design decisions learners find difficult. Such evaluation should use learner studies and expert-reviewed examples before adding semantic scoring.

## References

- Keuning, H., Jeuring, J., & Heeren, B. “A Systematic Literature Review of Automated Feedback Generation for Programming Exercises.” *ACM Transactions on Computing Education*, 2019. [DOI: 10.1145/3341229](https://doi.org/10.1145/3341229).
- “Feedback Systems on Computer Programming Courses: A Systematic Literature Review.” *IEEE Xplore*, 2026. [Record](https://ieeexplore.ieee.org/document/11396629/).
- Bisht, P. et al. “Automated Grading and Feedback Tools for Programming Education: A Systematic Review.” *Digital Threats: Research and Practice*, 2024. [DOI: 10.1145/3636515](https://doi.org/10.1145/3636515).

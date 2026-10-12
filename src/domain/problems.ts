import type { Problem } from "./types";

const sharedPrompts = [
  { id: "classes", title: "Classes & responsibilities", placeholder: "List each class and the job it owns…", hint: "Name the key domain and service classes. Explain what each one is responsible for.", minLength: 12 },
  { id: "relationships", title: "Relationships", placeholder: "Describe how the classes collaborate…", hint: "Describe associations, ownership, cardinality, and the direction of important calls.", minLength: 12 },
  { id: "patterns", title: "Design patterns", placeholder: "Name patterns you would use, or explain why none are needed…", hint: "Connect every pattern to a concrete requirement. It is fine to choose no pattern.", minLength: 4 },
  { id: "tradeoffs", title: "Trade-offs & edge cases", placeholder: "What would you simplify? What can fail?…", hint: "Discuss at least one trade-off and the cases your design must handle.", minLength: 12 },
];

export const problems: Problem[] = [
  {
    id: "parking-lot", title: "Parking Lot", eyebrow: "SPACE MANAGEMENT", level: "Intermediate", time: "30–40 min",
    summary: "Design a multi-floor parking facility that assigns suitable spaces and tracks vehicles from entry to exit.",
    statement: "Model a parking lot with multiple floors, different vehicle and space types, entry and exit points, and a ticket for each parked vehicle. Explain how a vehicle finds a compatible available space and how its stay is completed.",
    functionalRequirements: ["Support motorcycles, cars, and buses.", "Each space has a type and is available to compatible vehicles only.", "An entry point issues a ticket after parking; an exit completes the visit.", "Show available spaces by floor and vehicle type."],
    constraints: ["A bus needs five consecutive large spaces on one floor.", "A space can hold at most one vehicle.", "A vehicle cannot hold two active tickets in this lot."],
    considerations: ["Concurrent arrivals choosing the same space", "Ticket loss and payment failure", "Extending to reservations or pricing rules"], prompts: sharedPrompts,
  },
  {
    id: "elevator-system", title: "Elevator System", eyebrow: "REQUEST SCHEDULING", level: "Advanced", time: "35–45 min",
    summary: "Coordinate a bank of elevators as passengers make requests from floors and inside cars.",
    statement: "Design a system for a building with several elevators. Passengers can request a direction from a floor or choose a destination inside an elevator. The system should assign cars, move them safely, and update indicators.",
    functionalRequirements: ["Accept hall calls and in-car destination requests.", "Assign an elevator to each hall call.", "Move between floors and report current state and direction.", "Open and close doors while respecting safety signals."],
    constraints: ["An elevator has a capacity limit.", "Door interlocks prevent movement while doors are open.", "Requests may arrive while cars are moving."],
    considerations: ["Assignment fairness versus response time", "Out-of-service cars and reassignment", "Separating dispatch policy from movement safety"], prompts: sharedPrompts,
  },
  {
    id: "vending-machine", title: "Vending Machine", eyebrow: "INVENTORY & PAYMENT", level: "Beginner", time: "25–35 min",
    summary: "Model a vending machine that accepts payment, dispenses products, and handles unavailable items and refunds.",
    statement: "Design one vending machine with a product inventory, selection buttons, a payment flow, and a dispensing mechanism. A purchase should only succeed when the item is available and payment is sufficient.",
    functionalRequirements: ["Show products and their prices and availability.", "Accept a selection and cash or card payment.", "Dispense an item after a valid payment.", "Return change or refund when a purchase cannot complete."],
    constraints: ["Inventory cannot fall below zero.", "A product must not be dispensed twice for one payment.", "The machine can run out of change or go out of service."],
    considerations: ["Payment provider timeout after authorization", "Restocking and price updates", "Idempotent refunds and dispense failures"], prompts: sharedPrompts,
  },
];

export function getProblem(id: string): Problem | undefined {
  return problems.find((problem) => problem.id === id);
}

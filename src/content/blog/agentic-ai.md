---
title: "Agentic AI: From Workflows to Multi-Agent Systems"
date: "2026-03-24"
description: "A practical guide to choosing between deterministic workflows, single-agent systems, and multi-agent architectures — and knowing when to graduate from one to the next."
draft: true
---

There is a spectrum of autonomy in AI systems. On one end you have fully deterministic workflows — fixed pipelines where every step is predefined. On the other end you have multi-agent architectures where several LLM-powered agents collaborate, delegate, and reason independently. Most real-world systems sit somewhere in between.

This post lays out a practical framework for choosing where on that spectrum your solution should live.

## The Spectrum

```mermaid
graph LR
    A["Deterministic<br/>Workflow"] --> B["LLM-Augmented<br/>Workflow"]
    B --> C["Single Agent<br/>(Tool Use)"]
    C --> D["Multi-Agent<br/>System"]

    style A fill:#2d6a4f,stroke:#1b4332,color:#fff
    style B fill:#40916c,stroke:#2d6a4f,color:#fff
    style C fill:#52b788,stroke:#40916c,color:#fff
    style D fill:#74c69d,stroke:#52b788,color:#000
```

| Pattern | Control | When to use |
|---|---|---|
| **Deterministic workflow** | Full — every step is hard-coded | Steps are well-defined and rarely change |
| **LLM-augmented workflow** | High — pipeline is fixed, but individual steps call an LLM | Some steps need language understanding (extraction, classification) |
| **Single agent** | Medium — the LLM decides which tools to call and in what order | The task requires dynamic reasoning over a set of tools |
| **Multi-agent** | Low — multiple agents coordinate, each with its own tools and persona | The tool set is large, or the task naturally decomposes into distinct roles |

## Deterministic Workflows

A deterministic workflow is a fixed pipeline. No LLM is involved — or if it is, it operates within a single, predetermined step. Think of a classic ETL pipeline or a rule-based document classifier.

```mermaid
graph LR
    A[Input] --> B[Step 1]
    B --> C[Step 2]
    C --> D[Step 3]
    D --> E[Output]
```

**Use when:** the problem is well-scoped, steps don't change, and you don't need language reasoning. This is the cheapest, most predictable, and easiest to debug architecture. Start here whenever you can.

## LLM-Augmented Workflows

When one or more steps in your pipeline need language understanding — entity extraction, summarisation, classification — you inject an LLM into those specific steps while keeping the overall flow deterministic.

```mermaid
graph LR
    A[Input] --> B["Step 1<br/>(rule-based)"]
    B --> C["Step 2<br/>(LLM call)"]
    C --> D["Step 3<br/>(rule-based)"]
    D --> E[Output]
```

**Use when:** most of the pipeline is predictable, but a few steps genuinely benefit from an LLM. The control flow is still yours — the model is a tool, not the orchestrator.

## Single Agent with Tools

An agent is an LLM that decides *what to do next*. You give it a set of tools (functions, APIs, databases) and a goal, and it reasons about which tools to call and in what order.

```mermaid
graph TD
    U[User] --> A[Agent / LLM]
    A -->|calls| T1[Tool 1]
    A -->|calls| T2[Tool 2]
    A -->|calls| T3[Tool 3]
    A -->|calls| T4[...]
    A -->|calls| TM["Tool M"]
    T1 -->|result| A
    T2 -->|result| A
    T3 -->|result| A
    T4 -->|result| A
    TM -->|result| A
    A --> R[Response]
```

**Use when:** the task requires dynamic decision-making — the agent needs to decide which tool to call based on intermediate results. This is the sweet spot for many GenAI applications: a single LLM with a well-curated set of tools.

### The tool-scaling problem

This works well until your tool set grows. Research has shown that as the number of available tools increases, agent performance degrades — the model struggles to select the right tool from a large catalogue. This is where multi-agent systems come in.

## Multi-Agent Systems

The core idea is simple: instead of one agent with M tools, you have N agents, each with a focused subset of tools. A router (itself often an LLM) delegates incoming requests to the appropriate sub-agent.

```mermaid
graph TD
    U[User] --> R[Router Agent]
    R -->|delegates| A1[Agent 1]
    R -->|delegates| A2[Agent 2]
    R -->|delegates| A3[Agent 3]

    A1 -->|calls| T1[Tool A]
    A1 -->|calls| T2[Tool B]

    A2 -->|calls| T3[Tool C]
    A2 -->|calls| T4[Tool D]

    A3 -->|calls| T5[Tool E]
    A3 -->|calls| T6[Tool F]
```

**Use when:** your tool set has grown large enough that a single agent can no longer reliably select the right tool, or when the task naturally decomposes into distinct roles (e.g. a "research" agent, a "writing" agent, and a "review" agent).

### Sequential Multi-Agent Pipelines

A common variant is a sequential multi-agent pipeline, where agents hand off to each other in a chain — each agent completing one phase of the task before passing the result to the next.

```mermaid
graph LR
    U[User] --> A1[Agent 1<br/>Research]
    A1 --> A2[Agent 2<br/>Draft]
    A2 --> A3[Agent 3<br/>Review]
    A3 --> R[Output]
```

This is structurally similar to a deterministic workflow, but each step involves an LLM with tool access and its own reasoning loop. The line between an "LLM-augmented workflow" and a "sequential multi-agent system" is genuinely blurry — and that is fine.

## Choosing the Right Architecture

The decision tree is straightforward:

```mermaid
graph TD
    Q1{"Do any steps<br/>need an LLM?"} -->|No| W1[Deterministic Workflow]
    Q1 -->|Yes| Q2{"Does the LLM need<br/>to decide what to do<br/>(tool selection, branching)?"} 
    Q2 -->|No| W2[LLM-Augmented Workflow]
    Q2 -->|Yes| Q3{"Is the tool set large<br/>or does the task decompose<br/>into distinct roles?"}
    Q3 -->|No| W3[Single Agent]
    Q3 -->|Yes| W4[Multi-Agent System]

    style W1 fill:#2d6a4f,stroke:#1b4332,color:#fff
    style W2 fill:#40916c,stroke:#2d6a4f,color:#fff
    style W3 fill:#52b788,stroke:#40916c,color:#fff
    style W4 fill:#74c69d,stroke:#52b788,color:#000
```

Start simple. A deterministic workflow is always the cheapest, fastest, and most debuggable option. Graduate to more autonomous architectures only when the problem demands it.

## Closing Thoughts

Ultimately, the labels don't matter — impact does. Whether you call your system a "workflow", an "agent", or a "multi-agent architecture" is less important than whether it reliably solves the problem at hand. These patterns cover the vast majority of real-world needs. There is rarely a reason to reach for something more exotic.

The practical advice:

1. **Start with a workflow.** Hard-code what you can.
2. **Add LLM calls only where language understanding is required.**
3. **Move to an agent when the task needs dynamic tool selection.**
4. **Split into multiple agents when the tool set grows large** — it's been shown that segregating tools across specialised sub-agents improves reliability.
5. **Don't over-engineer.** A sequential workflow that works is better than an elaborate multi-agent system that doesn't.

This post was generated with genAI (more so than my other posts, will remove the label)

Blog post I love https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/closing-the-last-mile-in-document-ai-improving-extraction-quality-in-azure-conte/4502029


https://a9s.dev/blog/the-best-engineer-you-cant-hire
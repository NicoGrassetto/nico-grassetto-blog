---
title: "My Journey with GitHub Copilot and Vibe Coding"
date: "2024-12-03"
image: "/nico-grassetto-blog/images/copilot-action.png"
description: "Discover how GitHub Copilot is transforming the way developers write code with AI assistance"
---

# Copilot Effectiveness Formula

<img src="\src\content\blog\shapes at 25-06-12 20.03.57.png" alt="drawing" width="300"/>

When working with GitHub Copilot, I've found that its effectiveness can be modeled as:

$$P = \alpha \times E \times M \times \frac{\beta \times T}{C}$$

Where:

- **P** represents overall productivity
- **α** is the developer's skill coefficient
- **E** represents the developer's experience with AI tools
- **M** is the AI model capability (e.g., GPT-4 > GPT-3.5)
- **C** is the complexity of the task
- **β** is the tooling efficiency factor
- **T** is the time spent clearly describing the task to the AI

You can also express the impact of task decomposition on error rate as:

$$Error\_Rate = \frac{1}{n} \sum_{i=1}^{n} \frac{C_i}{M \times D_i}$$

Where **Cᵢ** is the complexity of subtask _i_, **M** is the model capability, and **Dᵢ** is the level of detail provided in the prompt for subtask _i_.

# Scope of the Task

I've noticed many people provide very high-level descriptions of what they want and then blame Copilot for not delivering exactly what they had in mind. Imagine describing a task vaguely to an intern and then getting upset when it's not exactly what you envisioned—how could they possibly know?

If the task is too broad, it increases the chance of deviation from your expectations. Often, I find myself needing to break tasks down further.

# Choosing the Right Model

The AI model itself carries significant responsibility for Copilot's accuracy. I've observed drastically different results between models like GPT-4.1 and Claude Sonnet 4. Generally, I aim for the latest, most powerful model available, as it significantly impacts how effectively it can handle complex tasks. Smaller models require more detailed breakdowns and clearer instructions.

# Level of Detail

I usually break down tasks into multiple chat sessions with Copilot. For example, recently I tried adding anchors to my personal blog. My initial prompt was simply: _"Add an anchor to my blog."_ I planned to iterate from there, but Copilot ended up breaking my entire layout—titles were misaligned, and I eventually had to revert to the original design.

The issue was that I hadn't broken down the task enough. Even seemingly simple tasks have many unknowns: _What should the anchor look like? Where should it be placed? How should it interact with the existing flexbox layout?_ After iterating for about 10 minutes, the result was a broken layout and incorrect design.

**Lesson learned:** If even you aren't clear on what you want, how can you expect Copilot to know? Sometimes it works because it's trained on enough data to guess common expectations, but this has its limits.

# So, What's the Solution?

I prefer breaking tasks into as many sub-tasks as possible. For each sub-task, I start a separate chat session. Once I'm satisfied with the output for that sub-task, I reset the chat, commit the changes, and move on to the next one.

I try to be as detailed as possible—_you can never be too detailed_. At the end of the day, Copilot is there to assist you, not replace you. You still need to handle the high-level thinking.

Speaking of assistance, many developers talk about code ownership but lose it completely by blindly accepting whatever Copilot generates.

At the end of every session, I thoroughly review the code—not necessarily because I think I can always do better (often I can't), but because **I want to understand my codebase thoroughly**. Sometimes, code blocks lack clarity or documentation; reviewing helps me spot these issues and iterate using inline Copilot suggestions.

Also, don't underestimate how much fluff Copilot can generate. Usually, about 10-20% of the generated code can be trimmed down through refactoring. I typically do this once I've met my initial requirements.

# My Workflow

My workflow usually involves a mix of Agent mode, Ask mode, Edit mode, and Copilot-generated commit messages (_who writes commit messages manually in 2025 anyway?_). Sometimes the commit messages need minor tweaks, but they still save precious seconds here and there.

After committing, I push to GitHub, triggering my GitHub Actions workflow. If it fails, I assign the fix to Copilot directly via GitHub issues. It's pretty neat for small bugs or build failures, but I don't see it replacing complete feature creation anytime soon (for reasons mentioned above).

We still need a human in the loop, and this is likely to remain true for the foreseeable future. After all, if you don't fully know what you want, how can Copilot?

# Documentation and Environment Setup

Writing README files has always been one of my coding nightmares. I almost completely offload this task to Copilot, making sure I describe exactly what I want. If I specify build or deployment steps, I ask Copilot to perform them afterward to validate the instructions.

Another tip: always explicitly ask Copilot to create a virtual environment—it sometimes does this automatically, but not always.

# Saving Even More Time

If you find yourself repeating the same instructions frequently, there's now a feature allowing you to specify a meta-prompt appended to every session at the repository level. It's a fantastic way to save valuable typing time. Make sure to set these up—it'll save you minutes (and even hours) down the line.

# Final Thoughts

GitHub Copilot is genuinely impressive, and its seamless integration with GitHub (the #1 git platform) makes it a no-brainer for boosting developer productivity. I know there are other tools out there (Google, Cursor), but let's be honest—the fact that Copilot integrates so smoothly with VS Code (and other editors) and GitHub is pure magic.

Personally, I've boosted my development productivity by at least a factor of 10 since heavily adopting Copilot. In fact, the very blog you're reading right now was built almost entirely using Copilot in just three days (_okay, I did code until 4 AM, but still!_).

I'll be publishing more blog posts targeting specific use cases (web development, code migration, etc.) in the near future.

I'll also keep updating this blog post over time as I gather more insights and learnings. 😉

This blog itself is a testament to what you can achieve using GitHub Copilot! -->

erg;lmzergmlz;zem---
title: "Spare thoughts on enterprise AI"
date: "2026-01-04"
description: "Demystg:er;z,grez,gifying enterprise AI and what it really means."
draft: falseze,gzerMZERT.grm
---

Lately, I've been wanting to bring closure to the topic of Enterprise AI.

The idea was sparked when I was planning a session for a client who wanted to understand what Enterprise AI was and how to implement it. While searching for a clear definition, I realised that most definitions differed significantly, leaving everyone with biased and opinionated views on the matter.

In discussions with clients, I often realise we're talking about entirely different definitions of Enterprise AI.

So here it is—my opinionated and biased view on Enterprise AI.

To begin, as mentioned, I started my quest for a definition by using ChatGPT and looking up definitions from IBM, Salesforce, Amazon, Google, and Microsoft.

That's where my first surprise came in: they all had different definitions. While some factors were similar or common, the essence of most definitions varied significantly.

A big factor tha tbugs me is also that people grossly overthink what it is about and sometimes teams even weaponise it as ane xcse to iterative and move forward slowly. Trust me, it's not that deep.

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
table th, table td {
  border: 2px solid #555;
  padding: 10px;
}
table th {
  background-color: #1a1a1a;
}
</style>

| Company | Definition for Enterprise AI |
|---------|------------------------------|
| [Google](https://cloud.google.com/discover/what-is-enterprise-ai?utm_source=chatgpt.com) | "Enterprise artificial intelligence (AI) is the application of AI technologies to address business challenges within <span style="background-color: red; color: white;">**an organization**</span>. It involves using machine learning, deep learning, natural language processing (NLP), and other AI techniques to automate processes, improve decision-making, and create new products and services. Enterprise AI goes beyond simple automation. It involves using AI to solve complex business problems that require human-like intelligence, such as understanding customer behavior, optimizing logistics, or detecting fraud. By leveraging large datasets and sophisticated algorithms, enterprise AI can help unlock insights, optimize operations, and drive innovation across various departments and functions." |
| [Amazon](https://aws.amazon.com/what-is/enterprise-ai//?utm_source=chatgpt.com) | "Enterprise artificial intelligence (AI) is the adoption of advanced AI technologies within <span style="background-color: red; color: white;">**large organizations**</span>. Taking AI systems from prototype to production introduces several challenges around <mark>scale</mark>, performance, data governance, ethics, and regulatory compliance. Enterprise AI includes policies, strategies, infrastructure, and technologies for widespread AI use within <span style="background-color: red; color: white;">**a large organization**</span>. Even though it requires significant investment and effort, enterprise AI is important for <span style="background-color: red; color: white;">**large organizations**</span> as AI systems become more mainstream." |
| [Salesforce](https://www.salesforce.com/artificial-intelligence/enterprise-ai/?utm_source=chatgpt.com) | "Enterprise AI is the application of AI for <span style="background-color: red; color: white;">**large organizations**</span>, helping boost workforce efficiency and productivity. It includes the use of autonomous agents and a combination of different AI technologies <mark>at scale</mark> — including machine learning, natural language processing (NLP), deep learning, computer vision, and automation — to change how people work across industries and sectors. This started with the first wave of predictive AI in 2016, and continued with the second wave of generative AI and copilots. Now, we're on the third wave of AI: AI agents." |
| [IBM](https://www.ibm.com/think/topics/enterprise-ai?utm_source=chatgpt.com) | "Enterprise artificial intelligence (AI) is the integration of advanced AI-enabled technologies and techniques within <span style="background-color: red; color: white;">**large organizations**</span> to enhance business functions. It encompasses routine tasks such as data collection and analysis, plus more complex operations such as automation, customer service and risk management." |

Let's first talk about what these definitions have in common. They all mention organizations—usually large ones. While that might seem trivial, it’s actually meaningful: organizations are hierarchical, with multiple teams often working in silos. There are data silos, different roles, and a variety of priorities, but some concerns are always top of mind for any organization:

- Security
- Governance
- Strategy (at least at a high level, regardless of the specific topic)

But here’s what bugs me: there are important aspects these definitions gloss over or ignore entirely.

For example, at least two mention scalability, but honestly, that’s not the most critical factor for enterprise AI—at least not in my view.

What about observability? Integration? These are just as important, if not more so, when it comes to making AI work in the real world of enterprises.


<div style="text-align: center;">
  <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWF6NzJpMmwyaDF6NnQ0YnVuMmtubjM4dDc2Y3hxM3picWg0anR6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FLo0LIBIUeI6c/giphy.gif" alt="Confused gif" width="600">
</div>

Another finding is that Microsoft doesnt have an offical
Turns out not even Microsoft has an official statemnet ab out enterpriose AI. I could find one by Google, Amazon, Salesforce

Come up with a unified definition.

Now that we have a definition let's brak down from a technological standpoint what enterprise AI means 


First off none of them talk about evaluiation and monitoring 
Observabuility is the bread and butter of enterprise AI.

Also they dont accoutn for enterprsie AI strategy or whatever you fancy calling it. Enterprise AI starts in the board room where an AI strategy is defined. While I;ve never defined one myself I would imagine suych a strartegy would cover prioritiuysing usecases and projects based on e.g. ROI, how to tackle governance, and compliance (for EU think AI Act or GDPR)

There's probably way more to it 



# On scalability
Despite what most people think, Enterprise AI can also be a a low traffic system used by internal employees. 

I've seen countless times (and literally a few minutes ago I was contacted about someone tinkering about whethger they should use GPT ). 

Let's focus on userr-facing applications processing what one would consider a large volume of requests.

Two factrso come into play:

- Latency:
- Volume:

Enterprise AI should be ready for scale but not necessary 

# Governance can be simple
First off what you are you governing? Some disconnectred projects using AI models (e.g. you might just want to govern your endpoints and models at least for cost control)
So… what is AI governance?

<!-- At its core, AI governance is how your company decides, enforces, and proves that its AI systems are used responsibly, safely, legally, and consistently.

Think of it as:

“The rules of the road + traffic cops + accident reports” for AI.

It’s not just policy docs. It’s who decides what’s allowed, how risks are managed, and how you stay out of trouble as AI spreads across teams.

Why it matters especially in your situation

You said:

“5 disconnected projects using LLM models on Foundry”

That’s the classic early-AI pattern:

Different teams

Different prompts, models, data sources

Different risk tolerances

No shared visibility

Governance exists to prevent:

🔥 One team leaking sensitive data

⚖️ Another violating licensing or regulations

🤖 Inconsistent or biased outputs hurting customers

🧨 Surprise incidents no one “owns”

What AI governance actually covers (practically)
1. Ownership & accountability

Basic but huge:

Who owns each AI system?

Who approves production use?

Who gets paged when something goes wrong?

Without this, incidents turn into “not my model” Olympics.

2. Model & use-case approval

Not all AI uses are equal.

Governance usually answers:

What use cases are allowed?

Which require extra review?

Which are banned entirely?

Example:

✅ Internal summarization → low risk

⚠️ Customer-facing advice → higher risk

🚫 Automated legal or medical decisions → probably no

3. Data governance for LLMs

This is where most companies get burned.

Key questions:

What data can be sent to LLMs?

Are prompts logged?

Is PII allowed?

Are outputs stored?

With multiple Foundry projects, you often see:

One team scrubbing data

Another “just testing something”

A third not realizing logs exist at all

Governance aligns these choices.

4. Security & access control

Who can deploy models?

Who can change prompts?

Who can access logs and outputs?

This is especially important when:

You have shared Foundry infrastructure

Multiple teams reuse the same base models

5. Quality, monitoring & drift

LLMs don’t just “work forever.”

Governance defines:

What does “good output” mean?

How do we detect hallucinations or degradation?

When do we retrain, rollback, or shut down?

Without this, production models quietly rot.

6. Compliance & regulation

Depending on your industry:

GDPR / privacy

SOC2 / ISO

Upcoming AI laws (EU AI Act, etc.)

Governance helps you answer regulators with:

“Yes, we know where our AI is, what it does, and how it’s controlled.”

What AI governance is not

Let’s kill a few myths:

❌ Not a single policy doc

❌ Not a blocker for innovation

❌ Not something only legal cares about

Good governance actually speeds teams up by removing ambiguity.

A simple mental model for your company

Given your “5 disconnected projects,” I’d frame governance like this:

Central guardrails, local autonomy

Shared standards for data, security, and risk

Teams still free to build and experiment

Visibility across all Foundry LLM usage -->
# Evaluation is overrated 
Let's be honest, most metrics for your RAG dont make sense and you know it. You just use it as copium to get a pat on the shoulder knowing that your RAG is still grounded.

In most cases, surprisngly the best evaluation is the one you do by hand. Gather a couple of data points or scenarios, put them in an Excel file and conduct.

Evaluation made sense in the era of machine learning and deep learning. One had to have a dataset so one had data. 

In the era of zero-shot and few-shot learning, agents and such despite best of the class attempts in the like of "oh youve got to hvae at least N datapoints no body has a ground truth. 

Your best shot is trial and error. This, in and of itself pauses a massive issue when it comes to reliabiiltya nd building trust in certain AI systems such as user facing RAG. 
Here we get into an interesting corner. 

I test in prod now fully makes sense and your worst nightmare actually becomes reality.

Be it as it may, there are two moments where you'd want to evaluate. 

Before pushing to /main or whatever branch you'd want to push to. 

Or evaluating on-demand while developing.




<div style="text-align: center;">
  <img src="https://res.cloudinary.com/teepublic/image/private/s--QP-eaxfe--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1605380432/production/designs/16107796_0.jpg" alt="I ONLY TEST IN PROD t-shirt" width="400">
  </a>
</div>

# Observability is key

# It comes at a cost
FinOps

# Security first
A year ago I was tasked by my manager to give a presentation about security for GenAI. I learnt about it 48 hours before and didn't know anythiong about the topic. In a fake it before you make it attempt I rushed the topic day and night. The biggest skill issue wasn't GenAI seciryt (filters, ...) but turned out to be traditional security concerns. Because before 

- Network: always use private endpoints, dont' go through the internet when you don't have toand things like that

- If you're using some cloud provider?: use managed identities instead of key auth

- Use Auth -> Explain some more

Be it as it may, AI and especially GenAI introduce new security concerns. Some of which are:

- Input sanitasiation:

- Output sanitasition:

- Model:

Now let's address what everyone talks about but no one uses Red Teaming for AI. There's a body of literatuer from academia addressing the topic. It's a thing and yes, many systems can be hacked or jaiulbroked and sometimes rather easily. One hands-on case I experienced was when I was working at Microsoft during my internshuiop. We partnered with a local podcast and built for them a production grade RAG grounded on their podcast data. 

- Security at heart (auth and such) - working with big teams
    - Check for prompt hacks and such

Refer to my slides from 

Talk about myu deck about Security for genai
# Integration, integration, integration
If by definition of enterprise ⇒ should integrate with the stack

Talk somewhere about DevOps, MLOps, GenAIOps, LLMOps

# So what? Let's talk about the artifacts
Landing zones (infra, AI, Agentic, ...)

MLOps, LLMOps, GenAIOps
Evaluation in CI/CD
# Conclusion


---
title: "Spare thoughts on enterprise AI"
date: "2026-01-04"
description: "TL;DR I believe people overthink what enterprise AI is.ß"
draft: true
---

# Introduction
**TL;DR** The concept of enterprise AI is, in my view, frequently overcomplicated. I have encountered numerous instances where enterprise AI is conflated with production-ready AI, with practitioners treating the two as interchangeable. Others acknowledge only a subset of the characteristics that constitute enterprise AI while overlooking equally important factors.

My central claim is this: every enterprise AI system is necessarily production-ready, but not every production-ready AI system qualifies as enterprise AI.

I will substantiate this claim through formal logic, with a touch of set theory because I love overthinking ;)

A definition that is reasonably correct is that enterprise AI seeks to solve business-level problems within organisations — typically focusing on automation, decision support, process optimisation, knowledge extraction, and customer operations.

I didn't really bother — I went on ChatGPT and asked for a definition. Since it's trained on publicly accessible data, one could assume that this tends to statistically represent the most commonly accepted definition.

As per ChatGPT's words:
```
Enterprise AI is about:
- Integration with existing business systems (ERP, CRM, supply chains)
- Reliability, security, governance, and auditability requirements
- ROI-driven deployment rather than experimental performance
- Domain-specific training on company data
```

To continue my quest for a objective definition I asked ChatGPT to look up definitions from big hyerpscalers: IBM, Salesforce, Amazon, Google, and Microsoft.

That's where my first surprise came in: they all had different definitions. While some factors were similar or common, the essence of most definitions varied significantly.

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

All definitions mention **organisations**. Two of them mention ***large* organisations** specifically. Finally, two of them mention the **scalability** factor.

Another notable finding is that Microsoft does not appear to have an official definition of enterprise AI. Formal definitions could only be sourced from Google, Amazon, Salesforce, and IBM.

Noticed anything so far? ChatGPT's definition doesn't align with what hyperscalers define as enterprise AI. Or is that so? Anyway, I think they're all right.

# Hypothesis

> The set of Enterprise AI requirements is a superset of production AI requirements. Consequently, the set of Enterprise AI systems is a subset of production AI systems.

Let $E$ be the set of all Enterprise AI systems, $P$ be the set of all production-ready AI systems, $R_E$ be the set of requirements for Enterprise AI, and $R_P$ be the set of requirements for production-ready AI.

**In terms of requirements**, Enterprise AI demands everything prod-ready AI does, and more:

$$R_P \subset R_E$$

**In terms of systems**, every Enterprise AI system is production-ready, but not vice versa — stricter requirements means fewer systems qualify:

$$E \subset P$$

Or equivalently:

$$(\forall x (x \in E \rightarrow x \in P)) \land (\exists y (y \in P \land y \notin E))$$

![Enterprise AI systems are a subset of prod-ready AI systems](./Untitled-2025-12-19-1440.png)

Since I love overengineering answers let us walk through the requirements for each AI system.

**Assumption**: ChatGPT's answer statistically reflects the commonly accepted definition.

As per ChatGPT's words:
```
In practice, enterprise AI is usually characterized by:

- Integration with existing business systems (ERP, CRM, supply chains)

- Reliability, security, governance, and auditability requirements

- ROI-driven deployment rather than experimental performance

- Domain-specific training on company data
```

## Production AI systems
Yet again, I used chatGPT with the same assumption as above.
**Assumption**: ChatGPT's answer statistically reflects the commonly accepted definition.

As per ChatGPT's words:
```
Production AI refers to artificial intelligence systems that are fully deployed, live, and actively being used in real-world environments — not just prototypes, experiments, or research models.

What Makes AI “Production”?

An AI system is considered production-grade when it includes more than just a trained model. It also has:
- Reliability
- Monitoring & Logging
- Integration
- Security & Compliance
- Continuous Updates
```

This article is about enterprise AI and not production ready AI systems. Therefore, I will not expand too much on the aforementioned.

We can observe that 
- Reliability, integration, and security & compliance also belong to enterprise AI as establised above (see definition)

What we are left with is `continuous updates` and `monitoring & logging`.

I posit that `continuous updates` is a necessary condition for `reliability` and that `monitoring & logging` is a necessary condition for `security & compliance`.

Let $C$ be the set of systems with continuous updates, $R$ the set of reliable systems, $M$ the set of systems with monitoring & logging, and $SC$ the set of systems with security & compliance.

$$R \subset C$$

$$\forall x (x \in R \rightarrow x \in C)$$

$$SC \subset M$$

$$\forall x (x \in SC \rightarrow x \in M)$$



# On the integration with existing business systems
As established earlier, Enterprise AI operates within large organisations. Such organisations typically employ a heterogeneous landscape of software systems and technology stacks — a reality rooted in a legacy of on-premises infrastructure, but equally driven by a contemporary strategic imperative to mitigate over-reliance on any single hyperscaler.

As a consequence, Enterprise AI necessitates an ecosystem that facilitates interoperability across disparate systems. In an organisation comprising $N$ systems, an Enterprise AI solution should be architected to accommodate the worst-case integration scenario — where the final solution must interface with all $N$ systems. 

As a result, one would want the ecosystem or platform to support communication standards to mitigate that worst case scenario whilst also facilitating (rewarding so to say) the best or average case scenario.

In human-friendly terms that essentially means you want to build on standards to avoid a lock-in whilst also provider shortcuts for when you are building within the same stack.

We've seen the rise of standards across agentic systems with MCP and A2A. This is still a work in progress but it's fair to assume that choosing technologies that support both is now the best choice.

Many platforms such as Amazon Bedrock and Microsoft Foundry also provide a rich ecosytem to accelerate your journey.

Many 

# On reliablity
I'll venture again into some mathematics goodness.

Let $S$ be the set of systems requiring scalability, $R$ the set of systems requiring reliability, and $P$ the set of all production systems.

$$S \subset R \subset P$$

Reliability is a byproduct of production — any system running in production must be reliable, full stop. But I have seen countless times people directly associating scalability with enterprise AI, as if the two were synonymous. While reliability *can* entail scalability, it doesn't necessarily have to.

For example, an internal low-traffic AI system used by a handful of employees needs to be reliable but need not be scalable. On the other hand, customer-facing AI systems (e.g. B2B or B2C) can absolutely demand scalability, where SLAs and resilience become paramount to operations.

In other words, enterprise AI should be *ready* for scale — but not necessarily *built* for it from day one.


# On governance and auditability
First off what you are you governing? Some disconnectred projects using AI models (e.g. you might just want to govern your endpoints and models at least for cost control)
So… what is AI governance?

# Continuous updates

# Monitoring & logging

# Towards a decision framework

A -Systems-> B where A is the source (data e.g.) and B where ther output is leveraged e.g. internal Teams chat, customer facing, ...

# Conclusion


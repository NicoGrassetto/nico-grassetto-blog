---
title: "Spare thoughts on enterprise AI"
date: "2026-01-04"
description: "TL;DR I believe people overthink what enterprise AI is.ß"
draft: true
---
TL;DR I think people overthink what enterprise AI is. The first time I was acquited with ceoncept of enterprise AI, is when I joined Microsoft back in 2023 and I thought I got it, but I still didn't until recently. You might be wondering why write an article about. Well it turns out I sorta kinda had to dig into what it is for a session for one of my customers.

I wholeheartely believe that most lack of alignment or conflicits are rooted in different defuiitions on a topic at hands,

The idea was sparked when I was planning a session for a client who wanted to understand what Enterprise AI was and how to implement it. While searching for a clear definition, I realised that most definitions differed significantly, leaving everyone with biased and opinionated views on the matter.

So here it is—my opinionated and biased view on Enterprise AI.

To begin, as mentioned, I started my quest for a definition by using ChatGPT and looking up definitions from IBM, Salesforce, Amazon, Google, and Microsoft.

That's where my first surprise came in: they all had different definitions. While some factors were similar or common, the essence of most definitions varied significantly.

A big factor tha tbugs me is also that people grossly overthink what it is about and sometimes teams even weaponise it as ane xcse to iterative and move forward slowly. Trust me, it's not that deep.
----
A definition that is quite on the sport is solve business-level problems inside organizations — typically focusing on automation, decision support, process optimization, knowledge extraction, and customer operations.

I didn't really bother -  I went on chatGPT and asked for a definitioon... Since it's trained on publically accessible data one could assume that this tends to statsiticalyu represent the most commonly accepoted defintioion
Enterprise AI is about:
- Integration with existing business systems (ERP, CRM, supply chains)
- Reliability, security, governance, and auditability requirements
- ROI-driven deployment rather than experimental performance
- Domain-specific training on company data
-----

I actually started my quest by asking what were the definitions from the big hyperscalers in town and this is really where things started picking up my itnerests

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

<!-- ...existing code... -->
# Thesis

> Enterprise AI is a superset of prod-ready AI.

Let $E$ be the set of all Enterprise AI systems, $P$ be the set of all production-ready AI systems, $R_E$ be the set of requirements for Enterprise AI, and $R_P$ be the set of requirements for production-ready AI.

**In terms of requirements**, Enterprise AI demands everything prod-ready AI does, and more:

$$R_P \subset R_E$$

**In terms of systems**, every Enterprise AI system is production-ready, but not vice versa:

$$E \subset P$$

Or equivalently:

$$(\forall x (x \in E \rightarrow x \in P)) \land (\exists y (y \in P \land y \notin E))$$

![Enterprise AI is a superset of prod-ready AI](./Untitled-2025-12-19-1440.png)

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

# On security
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

# On governance and auditability
First off what you are you governing? Some disconnectred projects using AI models (e.g. you might just want to govern your endpoints and models at least for cost control)
So… what is AI governance?



<div style="text-align: center;">
  <img src="https://res.cloudinary.com/teepublic/image/private/s--QP-eaxfe--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1605380432/production/designs/16107796_0.jpg" alt="I ONLY TEST IN PROD t-shirt" width="400">
  </a>
</div>


# On strategy
ROI-driven deployment

# Leveraging your company data

# Towards a decision framework
# Conclusion


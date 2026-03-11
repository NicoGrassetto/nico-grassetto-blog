---
title: "Building a job matching recommendation system in 2026"
date: "2026-01-05"
description: "Something"
draft: true
---

Focus article on code and logic

Omit infra (ACA, ACR, etc)



Some intro

1. create 

Two-Stage Retrieval + Ranking (Industry standard)


Embedding-Based Semantic Matching (Strong baseline, very scalable)

Context: we don't have any data about user interactions -> we can't use content based or otehrs.

1. Mine meta-data from resumé. 
{vector, skills, etc}
2. Embed resume using embedding model.
3. Store in a vector database (Azure AI Search)
4. Use weights + weighted average process
5. Top K
4. Retrieve (top k + retrieval algorightm)
6. 

resumé in -> mine -> embed -> filter on jobs -> retrieve top k

Other possible

N x M 
Instead of embedding separately, evaluate resume + job together.

Example input:

[CLS] Resume text [SEP] Job description [SEP]

Model outputs compatibility score.

Models:

BERT

RoBERTa

Pros

Highest semantic accuracy

Cons

Very slow for large datasets

Must be used only after retrieval

Typical pipeline:

Vector search -> top 200 jobs
Cross encoder -> rerank

resumé + job 

evaluating: /dev set and /test set

Relevant metrics:
- 
- 
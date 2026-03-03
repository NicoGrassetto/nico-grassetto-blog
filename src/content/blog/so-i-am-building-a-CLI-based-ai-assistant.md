---
title: "So I'm building a CLI-first general purpose AI assistant"
date: "2026-01-05"
description: "TL;DR I'm building Veloce - A lightweight, model agnostic, and fully customisable AI assistant."
draft: true
---

# Why

Veloce means "fast" in Italian.
I believe that word represents the essence of what Veloce is. It is fast to run, fast to download, fast to customise and fast to learn.

# Meet Veloce
There are many ways you could see Veloce:
- a CLI-first chatGPT/Claude/Copilot/Perplexity/...
- a

# Design philosophy
At heart, I wanted Veloce to be:

- Customisable (models, tools, anything ...)
- Simple: lightweight binary, project structure that even a 10 year-old can understand

I didn't want to build another TUI. Though, I thought about it but it just didn't feel right. We build UIs for so many things that we, CLI folks, don't need.

How many times I wanted to just trigger a `summarize` command on a file or ask a simple question without having to open up my browser.

`vel summarize <path | URL | str>` will do exactly that.

Maybe I also want to have multiple agents talking to each other. That will be configurable in the /agents folder and editable as a markdown file.

Today with the help of genAI one can also very easily modify Go code without neceessarkly having full knowledge about it.

To that end, Veloce will include markdown instructions for coding agents to facilitate it.

Last but not least, what about auto-generating its own tools based on what is needed and based on a e.,g. prompt. That will become avaible.

A roadmap will be decided in the coming weeks

I shamelessly drew inspiration from OpenCode and Claude Code.

It's also a learning journey for me so don't be too hassh

There will be one .go file per command. A command will ahve a conmfig file represented by yaml

Thigns that could be configured:
- model
- temperature and other LLM-specific params
- system prompt
- tools
- any other command args


> There is beauty in simplicity.

# Basically
I have 0 intent to make money off of it. I just wanted a tool that sits in my CLI where I spend most of my time. I wanted it to be fast, lightweight, and also customisbl.

I also wanted to embrace agentic AI through multi-agent systems and I believe markdown and/or declarative programming is the future of agentic design.

The tool will be completely customisable and I will be working on the integration of other modalities in the coming future.

# On support

The first version of Veloce will have the following.

## Commands
 - vel cheer
 - vel summarize
 - vel chat
 - vel ask
## Model provider
- OpenAI 
- Anthropic
- Ollama
Again, customisable so long as you implement an interface.

## Pre-built tools
- searching the internet
- OCR files 
- MCP connection
- writing files
-reading files
....
## Documentation and website



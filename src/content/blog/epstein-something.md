---
title: "So I analysed Epstein files using AI"
date: "2026-01-05"
description: "Something"
draft: true
---


The Epstein files (at least some of them have been released) and in a spark of curiosity and to be frank also trying here to do some productive procrastination I thought I'd run some AI analysis of them.

It's a fucking mess, it's 5 PM and I'm looking at the DOJ websoite. 

Let's use the website as groundtruth https://www.justice.gov/epstein/foia

I want to make that scalable, that is, I want to make sure that whatever data I get out of this I can persist and analyse post mortem.

Ok by now I know I'll have to work with social graphs. Network analysis I get to finally use you.


Let's start with the structure on the DOJ website.

There are thousands of files all of them different in nature. We'll have to brainstorm how to we connect everything


The first tab is about the Court Records.Interesitng. The challenge here is that a lot of victims have been redacted. Understandly so, we need to be respectful . At the end of the day it's more about finding more about the perpretartors than the 
victims so no big deal. Maybe we can find identify victims by Victim A, Victim B etc maybe we can uncover interesting facts. Who knows at this stage.


For all I know , the sub tabs in here don't mean much. Probably refer to dataa sources or hearings. let's open

Ok pdf so far are mostly about things to fill in or basically letters about who is suing who. Very administeative but we get some interesting info nonetheless about data of birth and acts committed. NOT TO BE DISCARTDED


The more I go in the files (it's a mess and probably on purpose) the more I realise we need some way to classify them by topic. The DOJ doesn't help in that
Give the mess I'm confident now that we'll need to run an AI on most files and folders to classify their type + descriptions.

After that we can finally do some kind of work per type.

Most pictures are to be discarded we are mostly here for data and text.

To eb honest I'm not even confident I want to dump all the files in there. I'd probably go for a manual approach first. Discard what I know I want to discard and dump the files I think are relevant.

We will be discarding pictures and videos. Let's focus on text. Challenge everything is a pdf in there evne pictures so it makes even more sense for me to do it manyually. I want to reduce the hange of a model (LLM) to block my requests

We have some first level data sources

Court Records
DOJ Disclosures, Including Disclosures Under the Epstein Files Transparency Act (H.R. 4405)
Freedom of Information Act (FOIA)
House Committee on Oversight and Government Reform Disclosures

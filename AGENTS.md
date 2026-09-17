# AGENTS.md — How to work in this repo

## Lesson tutorial prompt

When asked to write a teaching tutorial (or lesson guide) for anything built
in this repo, use this prompt shape. It produces the structured progressive
style from authentication.md.

---

Create a step-by-step teaching tutorial for [TOPIC] and save it as
my-app/[name].md, following these rules exactly:

1. Progressive numbered steps, top to bottom. Each step has exactly one job
   and one functionality. Each step builds only on steps before it.
2. Every step contains its complete, paste-ready code plus a short
   explanation. Never abbreviate code with placeholders or "...". Never dump
   a whole large file in one step — split big files across consecutive steps
   (shell first, then one feature per step), and finish with the assembled
   file only when it genuinely helps reference.
3. Read the actual repo files first and quote them exactly. Steps must match
   the code, including imports, prop names, and validation messages.
4. Plain formatting only. Headings and code blocks carry the structure.
   No heavy bold markup, no scattered notes. One file, one linear flow.
5. Teaching voice per step: one "Say this" line, then the code, then what
   each part does and why, then one checkpoint question for the class.
6. End with a verify step: the exact build or run command, plus an ordered
   click-through list that proves every feature works.
7. Close with a short list of review questions, one per key idea.
8. After the review questions, add appendices (Appendix A, B, ...) for the
   small details students always ask about: why a hook or API is used the way
   it is, why a lint rule does or does not fire, why an import looks odd.
   One appendix per question. Each appendix states the claim, shows the
   mechanism (rule source, docs, or code path), and proves it empirically
   (a lint run, a temp-file test, a build) instead of guessing. Never invent
   framework behavior — verify it first, then write it up.
9. Whenever a part, feature, or file covered by the tutorial is added,
   changed, or removed, update the tutorial in the same task so code and
   guide never drift apart. Quote the new code exactly, adjust or renumber
   affected steps, and re-run the verify step (build plus click-through)
   before finishing.

---

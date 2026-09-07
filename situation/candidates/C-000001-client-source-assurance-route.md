# Establish a client-source assurance route

## State

proposed

## Candidate

Define and apply an executable assurance route that can judge [P-000001](situation/promises/P-000001-inherited-element-client-source.md) and retain a noncircular PASS witness.

## Origin

[G-000001](situation/gaps/G-000001-client-source-assurance-route.md)

## Why consider it

A retained run URL or other durable evidence is needed before P-000001 can become assured or the root repository block can name a verification route as a gate.

## Qualification questions

- Which existing command or workflow can decide every Pass and Fail leg of a revised Oracle without broadening P-000001's Scope?
- Can that route retain direct evidence for every passing leg and a run URL that identifies the tested head?
- Does its evidence remain independent of the artifact whose provenance it would judge?

## Candidate approaches

- Qualify whether the inherited `Tests` workflow in `.github/workflows/tests.yml` can provide the needed client-source evidence.
- Qualify whether the inherited `Build` workflow in `.github/workflows/build.yml` can provide the needed evidence without making its artifact self-proven.

## Disposition

none

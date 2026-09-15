# Navigation Gate 1 assurance omits two declared observations

## State

open

## Gap

[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md) is `assured`, but its Oracle and PASS Witness do not fully decide two explicit in-Scope clauses: active navigation state after the declared Back and Forward traversal, and operability in each declared theme/viewport case.

## Relevance

The Promise contract requires cited PASS evidence for every behavior asserted by an assured Promise. The Oracle contract requires the Oracle to decide every explicit Promise clause within Scope, and the Witness contract makes a PASS Witness that omits an Oracle leg `INVALID` rather than partial PASS.

## Evidence

- P-000015 promises that refresh and one Back/Forward traversal preserve both their predeclared destinations and active navigation state. [O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md) requires the input observation to record each destination and active control, and F4 fails on a different destination or active state.
- [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md) records the current control after refresh but records only the destinations for Back and Forward. The linked [structured observation](situation/references/P-000015/gate-1/browser-pass.json) likewise has `currentControl` for Diagnostic, refresh, and Chat, but no active-control field or equivalent observation for Back or Forward.
- P-000015 also promises that the header and diagnostic workspace remain readable and operable in Poda Light and Poda Dark at both 1440 × 900 and 500 × 900. O-000015 P5/F5 decides visibility, geometry, overflow, and theme response for that matrix, but does not decide whether the controls are operable in each case. Its navigation sequence is declared only for Poda Light at 1440 × 900.
- W-000002 and the structured presentation observations retain visibility, rectangles, overflow, and computed-color results for the four matrix cases, but no interaction observation for the other theme/viewport cases.

## Impact

The retained evidence does not establish the complete assurance currently claimed by P-000015. This is an assurance-coverage absence, not evidence that the runtime destinations, active states, or controls actually fail.

## Resolution

none

## References

- [Gate Promise](situation/promises/P-000015-module-navigation-mount-gate.md)
- [Gate Oracle](situation/oracles/O-000015-module-navigation-mount-gate.md)
- [Gate PASS Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md)
- [Structured Gate observation](situation/references/P-000015/gate-1/browser-pass.json)
- [Promise contract](situation/promises/AGENTS.md)
- [Oracle contract](situation/oracles/AGENTS.md)
- [Witness contract](situation/witnesses/AGENTS.md)

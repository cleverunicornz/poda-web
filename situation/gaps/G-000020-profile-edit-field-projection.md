# Profile edit field names no longer match the submit projection

## State

open

## Gap

The transferred profile edit form's shared field helper uses each presentation
ID (`ppName`, `ppSlug`, and similar values) as the submitted field name, while
the unchanged submit handler reads the prior semantic names (`displayName`,
`slug`, and similar keys). Most edited profile values are therefore unavailable
to the submit projection; some edits are ignored and several existing values
are replaced with empty values.

## Relevance

[D-000022](../decisions/D-000022-pcc-native-design-transfer.md) selects a
profile design transfer with unchanged data contracts.
[P-000019](../promises/P-000019-pcc-native-module-design.md) includes the
creator-profile surface, and [O-000019](../oracles/O-000019-pcc-native-module-design.md)
P3/F3 judges profile interactions. The current Oracle and W-000001 exercise the
inline topic and segmented-visibility controls, but do not decide the changed
Edit Profile form's save projection.

## Evidence

- At reviewed head `ee1598172c939b75ad51b87233732be2c669964c`,
  `modules/poda-profile-spike/src/index.js:150-152` defines `editField` with
  both `id` and `name` set to its `id` argument. Calls at lines 203-219 and
  229-232 therefore submit names such as `ppName`, `ppSlug`, `ppHeadline`,
  `ppTopics`, `ppAvatar`, and `ppBooking`; social inputs created at lines
  156-162 use names such as `pp_s_website`.
- The submit handler at `modules/poda-profile-spike/src/index.js:297-345`
  still reads `social_<service>`, `displayName`, `slug`, `headline`, `tagline`,
  `aboutShort`, `topics`, `bookingUrl`, `avatarUrl`, `bannerUrl`, and
  `introVideoUrl`. Those names are absent from the corresponding generated
  inputs. The separately authored `bio`, `profileStatus`, `isPublic`, repeatable
  rows, and section-visibility names do still match.
- The pre-transfer source at
  `af00892498b68cba59146dc8b2c26a14b5312a55:modules/poda-profile-spike/src/index.js`
  used presentation IDs such as `ppName` while explicitly assigning semantic
  names such as `displayName`; the transfer replaced those inputs with the
  helper without changing the submit lookups.
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  P3 records inline topic addition and the summary-page visibility toggle, not
  an Edit Profile form submission that would expose this mismatch.

## Impact

Changing the display name is ignored because the handler falls back to the
current value. Saving can clear the slug, headline, tagline, short intro,
topics, social links, booking URL, avatar URL, banner URL, and intro-video URL,
even when the user supplied values in the displayed controls. The current
P-000019 evidence does not decide this profile preservation boundary.

## Resolution

none

## References

- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)
- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [O-000019](../oracles/O-000019-pcc-native-module-design.md)
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)

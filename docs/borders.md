# Borders: one pattern

Every line in dreamdesk follows three rules. The first two keep lines from
doubling up or going missing; the third keeps bevels from adding width.

## 1. A container draws its own edge, once

A box draws its outer border on all four sides. Nothing inside it draws a line on
the side that touches that border.

```css
.my-panel { border: var(--dd-edge, var(--color-window-border, var(--border))); }
```

Or use the `.dd-edge` class.

## 2. A child draws a divider only against a sibling

Inside a container, a line between two pieces is drawn by the **later** piece
(the right or lower one), on its **leading edge only** (`border-left` or
`border-top`). The first piece never draws one on the container's edge, because
that is where rule 1's line already is.

```css
.my-panel-sidebar  { border-left: var(--dd-edge-divider, var(--dd-edge, var(--color-window-border, var(--border)))); }
```

Or use `.dd-edge-divider-x` (leading left) and `.dd-edge-divider-y` (leading top).

Scrollbars follow it: the vertical bar draws a line on its left only, the
horizontal bar on its top only, and the pieces (arrow, track, thumb) draw
dividers only between each other. The left arrow draws nothing on the left,
because that is the container's edge.

## 3. Bevels are shadows, not lines

Raised and sunken looks come from inset light/dark `box-shadow` pairs. They never
add width, and they never replace a line from rules 1 or 2.

## Tokens

| Token | Meaning | Default |
|---|---|---|
| `--dd-edge` | the line a container draws round itself | `--dd-border`, then `--color-window-border`, then `--border` |
| `--dd-edge-divider` | the line between siblings | `--dd-edge` |

A dark surface can set a lighter divider so lines show against it. The Terminal
does exactly that: its outer edge stays black, and its scrollbar dividers are a
mid grey (`--color-terminal-edge`).

## Where it applies today

`.dd-scrollable`, the window scrollbars (`.dd-win-body`, `.terminal-win-body`,
`.dd-win-scroll-content`), the Pastelcore and base scrollbar rules, the Terminal
screen, the Explorer's pane divider (drawn by the list pane, the later sibling),
the status bar's section dividers, and the Browser's address box and its
dropdown divider.

Not migrated yet (they still hand-remove touching edges with `border-right: none`
and similar): the list view's header gridlines, the tab strip, the toolbar,
dialogs and the Start menu. The tree's dotted guide lines are not edges and stay.

## Adding a new window

Wrap scrolling content in `.dd-scrollable`, or give the scroll box
`border: var(--dd-edge, ...)` and its scrollbar parts the divider token. If the
new surface is dark, set `--dd-edge-divider` on it.

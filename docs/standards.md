# Standards

> [!IMPORTANT]
> This file contains all the required standards for components to get it accepted into the Datapack.

[[toc]]

## Rules
_NOTE: Not all the rules are here yet_

- **Components need to be able to work when suspended in the air.** This means that no redstone can be placed at y level 1 since its support block is out of bounds.
- **Components cannot power things outside of it other than through ports** to prevent accidental conflict. So don't power blocks through roofs or walls.
- **Modded components can have a status of extended semistandard at the highest** to prevent confusion and make sure people don't try to use them with vanilla.

<br>

## Ports

### Port Format

> [!NOTE]
> All ports will be named in this format:
> 
> `[DIR][TYPE]-[#PORTS][ROLE]`

::: details How the format works
- **[DIR]** > Can be either an Input, Output, or Bidirectional port (Labelled i, o or b) Bidirectional port holes don't exist for redstone ports yet, but do for item ports.
- **[TYPE]** > BIN (Binary) / HEX (Hexadecimal)
- **[#PORTS]** > The number of ports it has, as a number. If it only has 1 port, you don't have to include this tag! _(e.g. Just BIN instead of BIN-1)_
- **[ROLE]** > Most ports will be SD (Standard), but ports with specific roles will have different colors and have a different named tag. For example, HEX-STATE. If the port is SD you don't have to include this tag! _(e.g. just HEX instead of HEX-SD)_
:::

<br><br>

![Locations of each of the ports](/assets/ports.png)

::: info Port Compliance Ratings
- ✅**Compliant:** A port/component that is completely compliant!
- 😐 **Semistandard:** Incompatible with some ports, or a less used/more niche version of something else, or a separate size.
- ⚠️ **Extended Semistandard:** Compliant/semistandard but it is allowed to include modded blocks/items/entities.  An example would be create rotational power based ports or components.
- ❌ **Noncompliant:** It's not compliant as it doesn't fit under any other categories, does something already done but way way worse, or completely useless.
:::

<PortList file="redstone.yaml" />
<PortList file="item.yaml" />
<PortList file="mediumstone.yaml" />

## BuildStone
_NOTE: This is greatly experimental_

### BuildStone Standard

::: info BuildStone Compliance Ratings
- ✅**Compliant:** A build that is completely compliant!
- ❌ **Noncompliant:** It's not compliant as it doesn't fit under any other categories, does something already done but way way worse, or completely useless.
:::

![Locations of each of the ports](/assets/SupportStandardTopView.png)

<PortList file="support.yaml">
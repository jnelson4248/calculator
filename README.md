# calculator

A Simple calculator using HTML and JavaScript.

## Description:

Performs the basic functions of a calculator: Addition, Subtraction, Multiplication, and Division.  However, it does add several extra basic features:

## Features:


* Equations can be chained after "equals", by pressing an operator button to use the solution as the first operand (eg: 1 + 2 = 3 \* 4 = 12).  You can also continue equations by stacking results simply using the operators (eg: 1 + 2 \* 3 - 1 / 2 = 4).  However, the stacking of operators is non-intelligent, meaning the order is simply read from left to right (for example, no precedence is given to multiplication or division before addition and subtraction).

* The currently selected operator appears as an icon in the display screen while active, and the respective calculator key appears highlighted.  The currently selected operator key can also be changed/corrected (up until you begin keying in the second operand number), with the last selected operator ultimately being performed (eg: 2 + \* 3 = 6). The display also uses an icon to indicate when a solution is being shown as a result of using the "equal" key (as "="), or when the solution being displayed has become the first number of a new expression (as: "- =", "+ =", "\* =", or "/ =").

* "Reset" - Clears all numbers and expressions.

* "Clear" - Deletes the current, manually entered input (eg: 2 + 3 Clear 5 = 7). "Clear" has no effect on solutions (when the "=" is displayed alone), and does not clear any operations or solutions in memory.

* "Del" - Deletes the last digit of the current manually entered input, similar to "backspace" ("backspace" is actually the shortcut key).

* "Power" - Turns on and off the calculator.

* All keys also have at least one keyboard shortcut (see keyboard-map below)  


## Keyboard Map:

| Calculator Key    | (QUERTY keyboard) | (NumPad)          |
|-------------------|-------------------|-------------------|
| 0-9               | 0-9               | 0-9               |
| /                 | /                 | /                 |
| *                 | shift 8           | *                 |
| -                 | -                 | -                 |
| +                 | shift =           | +                 |
| =                 | =                 | enter             |
| +/-               | s                 | (no shortcut)     |
| .                 | .                 | .                 |
| Reset             | r                 | (no shortcut)     |
| Clear             | c                 | (no shortcut)     |
| Del               | d                 | (no shortcut)     |


# Known Issues:

* The "/" keyboard shortcut for divide functions in Firefox, but also open the default shortcut command "find/search in page".  After pressing "/", the user needs to close the "search" input box (or let it fade out) before continuing.  This does not seem to occur in Chrome.

* The display is limited to 20 characters.  Math involving very large or very small numbers has not been set up to be handled well.  And some configurations of input may not work.  

* Though the calculator will display extremely large or small numbers in exponential notation, the user can not input numbers using exponential notation.  

* This calculator can not be relied upon for important, precise calculations.  The math is handled in a simple way, using floats. Therefore calculations sometimes result in inaccurate solutions ( For example: 6.3 x 9 = 56.699999999999996 ).  This project (at least in version 1) is more about code structure and organization, than creating a precise mathematical tool.

* The Power button may be removed in later versions, as it serves no actual purpose other than pseudo-realism, and would probably prove to be annoying to anyone who actually uses the application regularly.

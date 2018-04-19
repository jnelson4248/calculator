# calculator

A Simple calculator using HTML and JavaScript.

## Description:

Performs the basic functions of a calculator: Addition, Subtraction, Multiplication, and Division.  However, it does add several extra basic features:

## Features:


* Equations can be chained after using the "equal" key (=), by pressing an operator button to use the solution as the first operand (eg: 1 + 2 = 3 \* 4 = 12).  You can also continue equations by stacking results simply using the operators (eg: 1 + 2 \* 3 - 1 / 2 = 4).  However, the stacking of operators is non-intelligent, meaning the order is simply read from left to right as they are keyed in (for example, no precedence is given to multiplication or division before addition and subtraction).

* The currently selected operator appears as an icon in the display screen while active, and the respective calculator key appears highlighted.  The currently selected operator key can also be changed/corrected (up until you begin keying in the second operand number), with the last selected operator ultimately being performed (eg: 2 + \* 3 = 6). The display also uses an icon to indicate when a solution is being shown as a result of using the "equal" key (as "="), or when the solution being displayed has become the first number of a new expression (as: "- =", "+ =", "\* =", or "/ =").

* If the "equal" key (=) is used to solve an expression without having manually keyed in a second operand, the calculator will assume the existing displayed number (the first operand) to also be the second operand (eg: 1 + = 2 ... being interpreted as 1 + 1 = 0, or 3 \* = 9 ... being interpreted as 3 * 3 = 9).  The user can change the sign of the existing displayed number without resetting it (eg: 1 + 'SIGN' = 0 ... being interpreted as 1 + (-1) = 0).  However, manually keying in either a number or decimal point will reset the number, resulting in the normal and expected operation.

* "Reset" - Clears all numbers and expressions from memory.

* "Clear" - Deletes the current, manually entered input (eg: 2 + 3 Clear 5 = 7). "Clear" has no effect on solutions (when the "=" is displayed alone), nor carried-over values that are not manually entered, and does not clear any operations or solutions in memory.

* "Del" - Deletes the last digit of the current manually entered input, similar to "backspace" ("backspace" is actually the shortcut key). "Del" also has no effect on solutions (when the "=" is displayed alone), nor carried-over values that are not manually entered.

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

* This calculator can not be relied upon for important, precise calculations.  The math is handled in a simple way, using floats. Therefore calculations sometimes result in inaccurate solutions (eg: 6.3 x 9 = 56.699999999999996, or: 12,345,678,901,234,560 + 1 = 12,345,678,901,234,560).  This project (at least in version 1) is more about code structure and organization, than creating a precise mathematical tool.

* The Power button may be removed in later versions, as it serves no actual purpose other than pseudo-realism, and would probably prove to be annoying to anyone who actually uses the application regularly.

* The Event Listener for keypad mouse clicks seems to occasionally not register.  I have accepted this behavior in this version, as it does not occur very often.

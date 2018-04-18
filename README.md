# calculator

A Simple calculator using HTML and JavaScript.

## Description:

Handles basic functions of a calculator: Addition, Subtraction, Multiplication, and Division.  However does add several basic features:

## Features:


* Equations can be chained after "equals", by pressing an operator button to use the solution as the first operand (eg: 1 + 3 = 4 * 3 = 12).  You can also continue equations by stacking results simply using the operators (eg: 1 + 3 * 4 - 6 / 4 = 1.5)

* The currently selected operator appears as an icon in the display screen while active, and the respective calculator key appears highlighted.  The currently selected operator key can also be changed/corrected (up until you begin keying in the second operand number), with the last selected operator ultimately being performed (eg: 2 + * 3 = 6). The display also uses an icon to indicate when a solution is being shown as a result of using the "equal" key (as "="), or when the solution being displayed has become the first number of a new expression (as: "-=", "+=", "\*=", or "/=").

* "Reset" clears all numbers and expressions.

* "Clear" deletes the current, manually entered input (eg: 2 + 3 Clear 5 = 7). "Clear" has no effect on solutions (when the "=" is displayed alone), and does not clear any operations or solutions in memory.

* "Del" deletes the last digit of the current manually entered input, similar to "backspace" ("backspace" is actually the shortcut key).

* All keys also have at least one keyboard shortcut (see keyboard-map below)  

* Power button - Turns on and off the calculator.


## Keyboard Map:

Calculator Key    (QUERTY keyboard)       (NumPad)
----------------------------------------------------------
0-9             0-9                     0-9
/               /                       /  
*               shift 8                 *  
-               -                       -  
+               shift =                 +
=               =                       enter
+/-             s                       (no shortcut)
.               .                       .  
Reset           r                       (no shortcut)
Clear           c                       (no shortcut)
Del             d                       (no shortcut)


# Known Issues:

- "/" keyboard shortcut for divide functions in Firefox, but also open the default shortcut command "find/search in page".  After pressing "/", user needs to close the "search" input box (or let it fade out) before continuing....Does not occur in Chrome.

- Display is limited to 22 characters.  Math involving very large or very small numbers has not been set up to be handled well.  And some configurations of input may not work.  

- Can not input numbers using exponential notation.  

- Do not rely on this calculator for precise calculations.  The math is handled in a simple way, using floats. Therefore calculations sometimes result in inaccurate solutions ( For example: 6.3 x 9 = 56.699999999999996 )

- Power button may be removed in later versions, as it is superficial, serves no actual purpose, other than pseudo-realism, and would probably prove to be annoying to anyone who actually uses the app regularly.

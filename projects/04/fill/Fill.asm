// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
(START)
@KBD
D=M
@BLACK
D;JNE
@color
M=0
@WRITE
0;JMP
(BLACK)
@color
M=1
(WRITE)
@SCREEN
D=A
@pixel
M=D
(WRITELOOP)
@color
D=M
@pixel
A=M
M=D
@pixel
M=M+1
@24576
D=A
@pixel
D=D-M
@START
D;JEQ
@WRITELOOP
0;JMP
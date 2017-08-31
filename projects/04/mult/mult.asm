// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
@sum
M=0   //Sum = 0
@i
M=0   // i = 0
@R2
M=0   //M[R2] = 0
(LOOP)
@i
D=M     // D = i
@R0     // A = address of R0
D=M-D   // D = M[R0] - i
@STORE
D;JEQ   // Jump to END if (M[R0] - i) == 0
@R1
D=M
@sum
M=M+D
@i
M=M+1
@LOOP
0;JMP
(STORE)
@sum
D=M
@R2
M=D
(END)
@END
0;JMP

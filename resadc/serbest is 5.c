#include <stdio.h>

int square_of_product(int a, int b) {
    int product = a * b;
    return product * product;
}
int main() {
    int num1, num2;
    scanf("%d %d", &num1, &num2);
    printf("%d", square_of_product(num1, num2));
    return 0;
}
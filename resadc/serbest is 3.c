#include <stdio.h>

int kub(int n) {
    return n * n * n;
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%d", kub(n));
    return 0;
}
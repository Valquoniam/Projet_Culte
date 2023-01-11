import pygame


pygame.init()

icon = pygame.image.load('assets/Arts/Culte-main-keyart.jpg')
pygame.display.set_caption("Culte")
pygame.display.set_icon(icon)
screen = pygame.display.set_mode((600,600))
running = True


clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((0, 0, 0))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
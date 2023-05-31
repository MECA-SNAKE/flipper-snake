# Robotic Snake
Pour commencer voici une présentation de notre magnigique serpent: Flipper
## Motivation 
  These flexible and slithering machines excel at navigating complex and confined spaces, offering immense potential in various fields, including search and rescue operations, industrial inspections, exploration, medical applications, surveillance and security, and hazardous environments.

In search and rescue scenarios, robotic snakes play a crucial role. Unlike traditional robots, they excel at maneuvering through narrow and cluttered environments, such as collapsed buildings or debris. With their flexible bodies, they can easily navigate tight spaces, climb obstacles, and explore inaccessible areas. Equipped with cameras and sensors, these robots transmit real-time data, aiding rescuers in locating survivors and assessing surrounding conditions.

In the realm of medicine, robotic snakes hold promise as potential assistants in minimally invasive surgeries. Their flexible bodies and precise control enable access to hard-to-reach areas within the human body with minimal invasiveness. Surgeons can remotely control these robots, reducing the risk of complications and enhancing surgical outcomes in various medical specialties.

##Preparation for the project

## Conception

### Material

### Piece design

![Alt Text](docs/animation_complete v7.gif)


#### 1.Important features

We had a relatively simple concept for the design, but we encountered some challenges. Our goal was to create a joint that could provide a wide range of motion, ideally spanning from 0 to 180 degrees. Additionally, we needed the servo to be securely held with minimal looseness.

To achieve this, we devised an interlocking piece system with a single axis of rotation. This design allowed for a maximum range of motion of approximately -30 to 230 degrees. For the servo, we opted for a straightforward holder with four holes, allowing us to screw the servos in place. To ensure a secure fit, we used inserts to provide the necessary thread pitch. This approach ensured a firm grip and enhanced stability for the servo

![Alt Text](docs/servo_hold.png)
#### 2. Movement propagation

Our next challenge was to transmit the movement from one piece to another along the servo's axis of rotation. To accomplish this, we picked one of the mounting heads of the servo. We duplicated its shape on our own piece so that when we assembled the two pieces together, we could attach the servo head from the top to the servo itself, completing the assembly.

We opted for a star-shaped head as it provided multiple points of contact with the next piece, making it easier to drive the movement. This approach proved to be highly successful. However, implementing the design required multiple attempts due to the complexity of the shape. After trials and errors, we finally achieved a well-fitting shape.
    
![Alt Text](docs/animation_star v1.gif)
To ensure a secure fit and prevent any dislocation, we implemented two additional features. Firstly, we created an extrusion beneath the surface of one piece, and corresponding to it, a hole in the second piece. This design allowed for a solid interlocking system between the two pieces.

Secondly, to minimize friction between the pieces, we incorporated a bearing. The extrusion was designed to fit snugly into the bearing, enabling smooth movement and reducing friction.

These modifications proved effective in achieving a well-fitting and stable assembly.
 
![Alt Text](docs/bearring_animation.gif)
#### 3. Allowing movement

Last but crucial point for the snake success is the addition of wheels. Indeed without this the snake would not go forward. It is due to the fact that the lateral friction created by the wheels forces the movement in one direction, and therefore allows it to move forward. It mimics what a real snake's scales does, increase friction in some direction. We really wanted to hide them as much as possible, to avoid people thinking they are driving the snake, instead of the undulated motion. The effort made to reduce their visibility result in a clean and elegant desgin.

![Alt Text](docs/design_wheels.png)
#### 4. Thinking ahead

The design is a cornerstone of the project. The smallest mistake could result in the failure of the entire project. We tried as much as possible to think about all possible problem that we could run into. One of them was cable management. In order to finish with a clean project we designed some hole in the piece that would let the cable run from tail to head. Unfortunately, we could not use them as the hole intended to accomplish this task were designed to small to fit the servo's end of the cable. 
    
### Electronics

### Cable Management
  
## Code
 
### Application

### Client-Server communication

### Controls

### Movements
  
    1. Inchworm
    2. Concertina
    3. Undulated
 
## Limitation

## Improvements


# Flipper - Snake Robot
Meet Flipper, an impressive snake robot measuring 1m20 and crafted from 13 intricately designed 3D-printed pieces. With its remarkable capabilities, Flipper elegantly navigates and explores its surroundings. This versatile robot boasts 3 distinct modes of motion: Inchworm, Concertina, and Undulation. The Inchworm mode enables precise inch-by-inch movement, the Concertina mode mimics the graceful accordion-like motion. In the Undulation mode, Flipper effortlessly slithers with a mesmerizing sinusoidal movement. Flipper's innovative design and diverse locomotion options make it a remarkable robotic creation. 

-- insert videos --

## How to reproduce the snake

--> marche à suivre

## Motivation 
Serpentine robots are a groundbreaking innovation in robotics, captivating researchers and engineers with their unique physical characteristics and versatile capabilities. These flexible and slithering machines excel at navigating complex and confined spaces, offering immense potential in various fields, including search and rescue operations, industrial inspections, exploration, medical applications, surveillance and security, and hazardous environments.

In search and rescue scenarios, robotic snakes play a crucial role. Unlike traditional robots, they excel at maneuvering through narrow and cluttered environments, such as collapsed buildings or debris. With their flexible bodies, they can easily navigate tight spaces, climb obstacles, and explore inaccessible areas. Equipped with cameras and sensors, these robots transmit real-time data, aiding rescuers in locating survivors and assessing surrounding conditions.

Our objective was to undertake a project that would have practical relevance in the real world. The field of robotics is continuously evolving, and we saw the development of a robotic snake as a chance to deepen our understanding of robotics and gain practical experience in designing and building complex systems. As a group of five computer scientists with backgrounds in communication systems and computer science, we possess a solid understanding of algorithms, programming languages, and system design, which are essential components in the development of a robotic system.

While we may not have had direct experience in building robotic systems, we embraced the opportunity to expand our expertise. We were committed to researching the specific technologies and methodologies required to develop a robotic snake, including mechanical engineering principles and electrical systems.

## Preparation for the project
After doing extensive research, we encountered 2 existing snake projects that served as profound inspiration for Flipper: 

* https://www.instructables.com/Bioinspired-Robotic-Snake/
* https://www.instructables.com/Snake-Robot-1/

Furthermore, our journey led us to a valuable encounter with a PhD student from the Bio-Robotic Lab at EPFL. During our conversation, she generously shared her insights and recommendations for a successful project within a shorter timeframe. One key suggestion was to focus on a signle degree of freedom for motion, ensuring efficiency and feasability. Additionally, she encouraged us to explore the mechanics behind sinusoidal functions, shedding light on the intriguing undulated motion exhibited by snakes. These valuable ideas and guidance have profoundly influenced our approach to Flipper's developpement. 

## Conception

### Material

* 1 LiPo Battery 2S 7.4V
* 1 ESP8266 microcontroller
* 1 PCA9685 servo motor controller
* 1 LM2596 DC-to-DC converter
* 12 DS6225MG Servo motors
* 48 M3 inserts (SIZE ?)
* 48 M3 10mm screws 
* 1 Adapter cable ModelCraft 58604
* A lot of cables and electric sheath
* 28 small lego wheels
* 2 Lasers 650mn 5V
* 12 bearings (SIZE ?)


### Piece design

![Alt Text](docs/animation_complete v7.gif)


#### 1.Important features

Initially, our design concept for Flipper was relatively straightforward. However, as we delved deeper into the design and development process of the pieces, we faced a number of challenges. Our primary objective was to create a joint capable of achieving a broad range of motion, ideally spanning at least 180 degrees. Additionally, we strived to ensure that the servo was securely held in place, with minimal looseness or play. Overcoming these obstacles became essential in achieving the desired functionality and stability of Flipper's design.

To accomplish our goal, we developed an interlocking piece system featuring a single axis of rotation. This design enabled us to achieve a wide range of motion, spanning from approximately -30 to 230 degrees, with the middle position set at 90 degrees. By utilizing this system, we ensured that Flipper could move smoothly and effectively within this expansive range.
For the servo motor, we opted for a simple yet effective holder design. This holder featured four holes strategically positioned to allow us to securely fasten the servos in place. To further enhance stability and ensure a tight fit, we utilized inserts with the appropriate thread pitch.


![Alt Text](docs/servo_hold.png)
#### 2. Movement propagation

The subsequent obstacle we faced involved transmitting the motion from one piece to another along the servo's axis of rotation. To address this challenge, we leveraged the star-shaped mounting head of a servo as a reference point. By incorporating a corresponding hollow shape in our own piece design, we were able to seamlessly connect and interlock two segments (refer to the attached picture).

Our decision to utilize a star-shaped head stemmed from its advantageous feature of offering multiple points of contact with the subsequent piece. This choice greatly facilitated the transmission of movement, making it more manageable to drive the desired motion. 

![Alt Text](docs/animation_star v1.gif)

To ensure a secure fit and prevent any dislocation, we implemented two additional features. Firstly, we created an extrusion beneath the surface of one piece, and corresponding to it, a hole in the second piece. This design allowed for a solid interlocking system between the two pieces.
Secondly, to minimize friction between the pieces, we incorporated a bearing. The extrusion was designed to fit snugly into the bearing, enabling smooth movement and reducing friction.
These modifications proved effective in achieving a well-fitting and stable assembly.

Although this approach proved highly successful, implementing the design was not without its challenges. The intricate shape posed complexities that necessitated multiple attempts and iterations. Through perseverance and a process of trial and error, we ultimately achieved a well-fitting shape that perfectly served our intended purpose.
 
![Alt Text](docs/bearring_animation.gif)

#### 3. Allowing movement

A fundamental and indispensable component that ensures the accurate movement of the snake is the incorporation of wheels. The lateral friction generated by these wheels imparts a unidirectional force, enabling the snake to move effectively. This mechanism aims to mimic the natural function of snake scales, which enhance friction in specific directions. Our primary objective was to minimize the visibility of the wheels, preventing any misperception that they are directly driving the snake's motion, contrary to its undulated movement. The meticulous effort invested in concealing the wheels yields a sleek and sophisticated design, emphasizing the clean aesthetics of the overall structure.

#### 4. Designing the Head

The design of the head was significantly influenced by our considerations for cable management and electronic components. Our goal was to accommodate a microcontroller, servo board, converter, and all the necessary circuit cables within the head. While the assembly of these components inside the head may appear somewhat intricate, we believe it to be a sound approach. This design choice offers the advantage of providing protection for all the internal elements, despite the potential complexity of the arrangement.

![Alt Text](docs/head.png)

--> image de la tete avec l'electronic

#### 5. Thinking ahead

The design aspect of the project is of utmost importance, as even the smallest oversight could lead to the failure of the entire endeavor. We made a conscientious effort to anticipate and address all potential challenges that could arise. One such challenge was cable management. To ensure a polished end result, we incorporated holes in each piece to allow the cables to seamlessly traverse from the tail to the head. However, we encountered a setback as these holes turned out to be too small to accommodate the servo's cable end.

![Alt Text](docs/design_wheels.png)
    
### Electronics

The primary role of our electronic components is to effectively control the servo motors. To accomplish this, we utilized a PCA9685 board specifically designed for transmitting PWM (Pulse-Width Modulation) signals to the servo motors. This board was then connected to our microcontroller, which housed the necessary code for servo movement. However, we encountered several challenges when it came to powering the entire circuit, which will be elaborated upon in the subsequent sections.

![Alt Text](docs/electronic.png)

#### 1. Placing the Battery

Initially, our plan involved utilizing three 7.4V Lipo batteries, which necessitated careful consideration regarding their placement and accessibility. To securely accommodate these batteries, we devised three additional pieces with integrated holders. This design adaptation ensured that the batteries were not only firmly held within the snake but also easily replaceable when required.
However, following an extensive discussion with members of the DLL building and Professor Koch, we made the decision to reduce the battery count to just one. The consideration was primarily due to the challenges associated with parallel connection to achieve a higher current output, which could potentially risk damaging the batteries. Given that these batteries are specifically designed to deliver a significant amount of current within a short duration, opting for a single battery proved to be a prudent choice

![Alt Text](docs/battery.png)

#### 2. Powering the servos directly from the battery


Upon examining the electronic schema, an intriguing observation arises: the servo motors' positive and negative cables are not directly connected to the PCA9685. Instead, we have implemented a configuration where all the servo grounds are connected to the battery ground, and all the servo positive terminals are linked to the battery's positive terminal.
This unique arrangement serves a specific purpose within the circuit design, providing a common ground for the servos and maintaining a shared power source through the battery's positive terminal. In fact this idea was from our professor because ... EXPLANATION.

#### 3. Voltage and Current

Our circuit design faces various constraints due to specific voltage and current requirements of different components:

*The servo motors operate within a voltage range of 4.8-6V.
*The ESP8366 module operates at 3.3V.
*The ESP8266 module requires a voltage supply of 5V.
*The battery supplies a voltage of 7.4V.
*The PCA9685 board's circuit needs a 5V voltage supply.

Since we utilize the PCA9685 board solely for servo control and not for powering them, we do not need to utilize the V+ port, which is intended for servo power supply. As a result, we power the board's circuit exclusively through the VCC port, requiring a 5V input voltage. Considering the battery supplies a voltage of 7.4V, we incorporated a DC-to-DC converter to transform the battery's output voltage to 5.5V. This voltage level proved sufficient to power the servos while remaining within an appropriate range for the microcontroller and the board's controller circuit 

#### 4. Placement of the electronic components

Minimizing the number and size of electronic components posed a significant challenge in our project, particularly due to the limited surface area available on the snake for their placement. After careful consideration, we devised a solution: consolidating and integrating all the electronic components inside and above the snake's head. This decision proved advantageous as it centralizes all the electronics in one location.
Although one might argue that this approach leads to a cluster of cables near the head, we deemed it a superior alternative to the idea of routing cables to both the tail and the head. By concentrating the cables in one area, we achieved a more streamlined and organized design. Moreover, having all the electronics in close proximity is convenient as it provides easy access to the necessary components.

### Cable Management

Efficient cable management is intricately intertwined with the electronic design of our project. To tackle this challenge, we successfully employed numerous zip ties to neatly bundle the cables together. At this juncture, we implemented a thoughtful design for the head, incorporating small holes that allow the cables to pass through and connect to the board and microcontroller. 

--> image of the holes of the head

One of the primary challenges pertaining to the cables revolved around soldering the positive and negative wires of all the servos to the corresponding terminals of the battery after the converter. While the process itself was repetitive and not excessively complex, it required utmost caution to avoid any missteps. A single missed solder joint would necessitate starting over from the beginning, amplifying the importance of being attentive to detail throughout the soldering process.

--> images of the soldering of the +/-
  
## Software Design

The software architecture is structured into three main components: **the motions**, the code for **the UI** and the code for **the client-server communication**. In this section, we will delve into the implementation details and the reasoning behind each component. While the UI code primarily focuses on the design aspects of the application and utilizes React principles, we will specifically highlight the functionality of the joystick, which plays a crucial role in fully controlling the snake.

### React Native App

The snake control application is a mobile app developed using React Native, a popular framework for building cross-platform applications. Written in TypeScript, a statically-typed superset of JavaScript, the code ensures code reliability through type checking. The snake control app allows users to control the snake's movements wirelessly. The application utilizes various components and libraries to create 2 main views: a home view where we can select the mode of motion and other parameters, and a user-friendly interface to control the snake after activating a motion.

![Alt Text](docs/main_app.gif)

The "game" mode of the application is designed in a way that facilitates the user experience of controlling the snake. We used a joystickbn to allow the user to control the snake. The app has taken various different faces throughout our project, initially, our goal was to be able to allow the user to enter any possible combination of parameters for the wavelength, amplitude, speed and frequency, but the more we tested out our snake's motion, we realized that random parameter inputs were not to the snake's advantage. We decided to abandon this idea to prevent the snake from making sudden movements and damaging itself. We have pre configured parameter inputs to plug into the snake at any moment the user wants it to turn right, left, go forwards or backwards. It's important to note that the application doesn't allow the user to go left or right if the inchworm motion is enabled and doesn't allow the user to go anywhere but forwards if the concertina motion is enabled. This is because we have to flip the snake over when the inchworm motion is enabled, imposing only 1 degree of freedom on the vertical axis.

Finally, with some solid background of computer science studies, we thought that React Native was a very straight-forward and intuitive framework to use for our snake project. By combining efficient state management, network communication, and intuitive user interface design, the application offers a seamless and engaging experience for controlling the snake wirelessly.

![Alt Text](docs/final_example.gif)

### Client-Server communication


To establish communication between the ESP8266 and the React Native app, we initially planned to utilize Bluetooth Low Energy (BLE) due to its simplicity and ease of deployment. However, we soon realized that the ESP8266 lacked a Bluetooth module and instead possessed a Wi-Fi module. This prompted us to change our approach and leverage the Wi-Fi capabilities of the ESP8266.
To enable communication between the React Native app and the ESP8266, we deployed a web server on the ESP8266. This web server served as a central hub to handle incoming POST requests from the app, allowing for seamless control of the snake. Within the web server, we implemented multiple routes to handle various POST requests from the client (the app). One example is the route designed for resetting the snake. When the user pressed the "reset" button in the app, a corresponding POST request was sent to the designated endpoint on the ESP8266. This triggered the necessary actions to reset the snake to its initial state. Here is the code that illustrates the "receive" function on the server side.

``` cpp
// Server-side code
server.on("/reset", HTTP_POST, [](AsyncWebServerRequest *request) {
    if(request->hasParam("value", true)) {
      AsyncWebParameter* p = request->getParam("value", true);
      int value = p->value().toInt();

      if(value == 0) {
        motion_snake = NONE;
      }
      request->send(200, "text/html", "good"); 
    } else {
      request->send(404, "text/html", "Error reset"); 
    }
  });

```

```ts
// Client-side code
const App: React.FC<Props> = () => {
    // ... 
        
    const handleButtonReset = () => {
        sendRequests("value", "0", "reset");
    }
    
    // ... 

    function sendRequests(key: string, val: string, root: string) {
        axios.post('http://192.168.236.121/' + root, {
          [key]: val
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });

        }
   }  
   
   // ... 
   
   return (
        // ...  
    
        <TouchableOpacity onPress={handleButtonReset}>
          <Text>Reset</Text>
        </TouchableOpacity>   
        
         // ...        
   )
}
```


On the client-side (the app), the application harnesses the power of the axios library to facilitate HTTP requests, allowing seamless communication between the app and the snake robot. Axios serves as a valuable tool for sending commands and receiving data from the snake.
Within the application, a function called "sendRequests" takes charge of sending control commands to the snake. This function enables various actions, such as initiating or halting the snake's motion, adjusting parameters such as wavelength and amplitude, and selecting different motion modes like concertina or undulated. By utilizing axios, these commands are efficiently transmitted to the snake, allowing for precise control and customization of its behavior.

### Movements and Controls

Let's dive into the motion capabilities of the snake and how we control the servos from the microcontroller. As previously mentioned, the servos are controlled by a specialized board using pulse-width modulation (PWM) signals. This method allows us to precisely control the average power delivered to the servos.
In simple terms, we can send pulses of a specific length to the servos, which will move them from one angle (Angle A) to another angle (Angle B). By manipulating the length of these pulses, we can control the position and movement of the servos.
Now, let's discuss the mathematical functions that govern the snake's motion and how they interact with the phone app, particularly the joystick control.


``` cpp
#define MIN_PULSE_WIDTH 800
#define MAX_PULSE_WIDTH 2000
#define FREQUENCY_SERVO 50

Driver driver = Driver(0x40);

int rotate_with_min_max(int servo, double angle) {

  int pulse_wide = map(angle, 0, 180, MIN_PULSE_WIDTH, MAX_PULSE_WIDTH);

  return int(float(pulse_wide) / 1000000 * FREQUENCY_SERVO * 4096);
}

driver.setPWM(5, 0, rotate_with_min_max(5, 80));
```


In the provided code snippet, you can see that we define the minimum and maximum pulse widths as 800 and 2000 microseconds, respectively. These values represent the range of pulses that we can send to rotate the servos, allowing us to move them from 0 to 180 degrees. For instance, a pulse width of 800 microseconds would correspond to a servo position of 0 degrees.
Additionally, we set the frequency to 50Hz, which means that we can update the position of each servo 50 times per second. This frequency ensures smooth and responsive servo movements.
To rotate a specific servo to a desired angle, we use the "setPWM" function. In the provided example, the function "rotate_with_min_max" is called to convert the desired angle (80 degrees in this case) into the corresponding pulse width value within the defined range. This conversion is achieved using the "map" function from the Arduino library, which maps a range of values to another range of values.
Finally, it's important to note that the PCA9685 board operates at a 12-bit resolution. Therefore, the pulse width value needs to be converted into a 12-bit value (ranging from 0 to 4095) to match the resolution of the PCA9685.

With the understanding of how the servos are controlled, let's now explore the different motions implemented for the snake.
  
#### 1. Inchworm
--> robin mon reuf

To achieve an inchworm-like motion, a modification is required in the snake's movement. Instead of moving in a lateral undulating manner, we need to flip over the snake to allow it to move freely in the vertical direction and straight forward, rather than to the side.
By flipping the snake, the direction of movement changes, and the snake can simulate the inchworm motion. This modification involves adjusting the sequence of segment movements and the coordination between the head and tail segments.
To move, the robotic inchworm extends one segment forward while simultaneously contracting the adjacent segment backward. This action creates a looping or undulating motion similar to that of a real inchworm. 

    
#### 2. Concertina

--> insert gif of concertina

In the video, you can observe that the snake performs a unique motion characterized by contracting itself with a specific wavelength, lengthening half of its body, contracting the front half once again, and simultaneously lengthening the tail. Surprisingly, this motion was proved to be the most challenging aspect of a snake's movements, mainly due to its "step-by-step" nature on the ground.
Extensive research revealed that this particular motion, known as the concertina movement, is inherently complex, even in other snake projects. It presents greater difficulties compared to the undulated movement, which involves a smoother wave-like motion.
The development and successful implementation of the concertina motion required careful analysis, experimentation, and fine-tuning to achieve the desired results. The challenges encountered during this process highlight the intricate nature of replicating snake locomotion in a robotic systems.

#### 3. Undulated

Lateral undulation, the typical undulating movement of a snake, was the primary locomotion type we aimed to achieve in our project. Implementing this motion required a closer look at the underlying mathematics.
Surprisingly, the equation for a simple undulation was not overly complex; it could be represented by a sine wave. In theory, this may seem logical, but there was a crucial consideration to keep in mind. While our concept of undulation exists in a continuous world, our robotic snake consists of discrete components with **fixed length**, unlike a real snake that can extend its body. This aspect posed a significant challenge and was a source of concern for us. No matter how well-designed our parts were, implementing a continuous sine wave equation on our snake remained uncertain.
However, through rigorous testing and experimentation, we discovered that our implementation of the sine wave equation for lateral undulation did indeed work. The coordinated movement of the servo motors and the discrete segments produced a convincing simulation of the undulating motion observed in real snakes.

Overcoming this challenge was a significant milestone in our project, as it enabled us to replicate the characteristic locomotion of snakes. Although our snake's body consists of fixed-length segments, we were able to utilize the principles of the sine wave to achieve a fluid and lifelike undulation

    
## Limitation

## Improvements

--> calibration of the servos, second degree of freedom, avoiding wheels with a material, 


















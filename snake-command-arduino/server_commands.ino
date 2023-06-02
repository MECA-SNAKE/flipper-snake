// This file defines the code to command the snake

// -------------------------------------------------------------------------------------
// INCLUDES
// -------------------------------------------------------------------------------------
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

// -------------------------------------------------------------------------------------
// DEFINES
// -------------------------------------------------------------------------------------
#define MIN_PULSE_WIDTH 800 // best 895
#define MAX_PULSE_WIDTH 2000 // best 2095
#define FREQUENCY_SERVO 50

#define N_SERVOS 12
#define HEX_CHANNEL 0x40

#define DEFAULT_AMP 40.0
#define DEFAULT_FREQ 1.0
#define DEFAULT_OFF 0.0
#define DEFAULT_WL 1.0
#define DEFAULT_SPEED_INCH 1

#define TRIGGER_PIN 12
#define ECHO_PIN 14
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.39370100

// -------------------------------------------------------------------------------------
// TYPEDEF
// -------------------------------------------------------------------------------------
typedef Adafruit_PWMServoDriver Driver;

typedef enum {
  UNDULATED, CONCERTINA, INCHWORM, NONE
} motion;

typedef enum {
  FORWARD, BACKWARD, NO_MOVE
} direction;

// -------------------------------------------------------------------------------------
// PARAMETERS
// -------------------------------------------------------------------------------------
Driver driver = Driver(HEX_CHANNEL);

const char* ssid = "giogio_larue";
const char* password = "21ff99a2c0cd";

AsyncWebServer server(80);

int is_running = 0; // 0 -> not running, 1 -> running
motion motion_snake = NONE;
direction dir_snake = NO_MOVE;

double speed_inchworm = DEFAULT_SPEED_INCH;
double amplitude = DEFAULT_AMP;
double offset = DEFAULT_OFF;
double wavelength = DEFAULT_WL;
double frequency = DEFAULT_FREQ; 

// -------------------------------------------------------------------------------------
// MAIN FUNCTIONS
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// This function rotates a specific servo of an certain angle
int rotate_with_min_max(int servo, double angle) {

  int pulse_wide = 0;
  if(servo == N_SERVOS - 1) {
    pulse_wide = map(angle, 0, 180, MIN_PULSE_WIDTH, MAX_PULSE_WIDTH + 100);
  } else {
    pulse_wide = map(angle, 0, 180, MIN_PULSE_WIDTH, MAX_PULSE_WIDTH);
  }

  int al = int(float(pulse_wide) / 1000000 * FREQUENCY_SERVO * 4096);
  return al;
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// This function rotates a specific servo of an certain angle (simpler)
void rotate(int servo, double angle) {
  int value = driver.setPWM(servo, 0, rotate_with_min_max(servo, angle));
}
/*
// This function return the distance of the first object in the direction of the sensor
float distance_sensor() {

  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);
  
  // Calculate the distance
  return pulseIn(ECHO_PIN, HIGH) * SOUND_VELOCITY/2;
}
*/
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// This function activates the inchworm's motion
void inchworm_motion() {

  for(int phi = 0; phi <90; ++phi){
    if(motion_snake == INCHWORM) {
      while(is_running == 0) {
        if(motion_snake != INCHWORM) {
          reset();
          delay(10);
          return;
        }
      }
      rotate(0, 90-phi);
      rotate(1, 90-phi);
      rotate(2, 90+phi);

      delay(10);
    } else {
      reset();
      delay(10);
      return;
    } 
  }

  for(int i = 0; i <= N_SERVOS-4; ++i){
    for(int phi = 0; phi < 90; ++phi){
      
      if(motion_snake == INCHWORM) {
        
        while(is_running == 0) {
          if(motion_snake != INCHWORM) {
            reset();
            delay(10);
            return;
          }  
        }

        if(i>0){
          rotate(i-1, 180-phi);
        }

        rotate(i, 2*phi);
        rotate(i+2, 180-2*phi);
        rotate(i+3, 90+phi);
        delay(10);

      } else {
        reset();
        delay(10);
        return;
      }
    }  
    delay(1000 / speed_inchworm);
  } 
}

int even = 1;

void concertina_motion() {

  if(even == 1) {
    for(int phi = 0; phi <= 90; phi++) {
     
      rotate(11, 90 - phi);
      rotate(10, 90 + phi);
      rotate(9, 90 + phi);
      rotate(7, 90 - phi);
      rotate(6, 90 - phi);
      rotate(5, 90 + phi);
      delay(5);
    } 

    delay(100);


    for(int phi = 0; phi <= 90; phi++) {
      rotate(5, 180 - phi);
      rotate(4, 90 + phi);
      rotate(3, 90 + phi);
      rotate(1, 90 - phi);
      rotate(0, 90 - phi);
      delay(30);
    }

    delay(100);

    for(int phi = 0; phi <= 90; phi++) {
      rotate(5, 90 - phi);
      rotate(6, phi);
      rotate(7, phi);
      rotate(9, 180 - phi);
      rotate(10, 180 - phi);
      rotate(11, phi);
      delay(5);
    }  

    delay(100);


    for(int phi = 0; phi <= 90; phi++) { 
      rotate(0, 180 - phi);
      rotate(1, 180 - phi);
      rotate(3, phi);
      rotate(4, phi);
      rotate(5, phi + 10);
      delay(5);
    }

    delay(100);

  } else {
    for(int phi = 0; phi <= 90; phi++) {

      rotate(11, 90 + phi);
      rotate(10, 90 - phi);
      rotate(9, 90 - phi);
      rotate(7, 90 + phi);
      rotate(6, 90 + phi);
      rotate(5, 90 - phi);
      delay(5);
    }  

    delay(100);

    for(int phi = 0; phi <= 90; phi++) {      
      rotate(5, phi);
      rotate(4, 90 - phi);
      rotate(3, 90 - phi);
      rotate(1, 90 + phi);
      rotate(0, 90 + phi);
      delay(30);
    }  


    delay(100);

    for(int phi = 0; phi <= 90; phi++) {
      rotate(5, 90 + phi);
      rotate(6, 180 - phi);
      rotate(7, 180 - phi);
      rotate(9, phi);
      rotate(10, phi);
      rotate(11, 180 - phi);
      delay(5);
    
    }

    delay(100);

    for(int phi = 0; phi <= 90; phi++) {
      rotate(0, phi);
      rotate(1, phi);
      rotate(3, 180 - phi);
      rotate(4, 180 - phi);
      rotate(5, 180 - phi);
      delay(5);
    }

    delay(100);
  }
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// This function sets the snake in a straight line
void straight() {
  for(int i = 0; i < N_SERVOS; i++) {
    delay(500);
    rotate(i, 90);
  }
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// This function activates the undulated motion of the snake
void undulated_motion() {
  for(int i = 0; i < 360; i++) {
  
    float brads = i * 3.1415 / 180.0; 

    for(int j=0; j<N_SERVOS; j++){  
      
      if(motion_snake == UNDULATED) {
        while(is_running == 0) {
          if(motion_snake != UNDULATED) {
            reset();
            return;
          } else {
            continue;
          }
        }
        if(dir_snake == FORWARD) {
          rotate(j, 90 + offset + amplitude * sin(frequency * brads + (wavelength * j * 2 * 3.1415) / (N_SERVOS - 1)));
        } else {
          rotate(j, 90 + offset + amplitude * sin(-frequency * brads + (wavelength * j * 2 * 3.1415) / (N_SERVOS - 1))); 
        }  
      } else {
        reset();
        return;
      }
    }
   delay(10);
  }
}

// Updates the speed of the inchworm
void update_speed_inchworm(double s) {
  speed_inchworm = s;
}

// Updates the mode (0 -> stop, 1 -> start)
void update_mode(int m) {
  is_running = m;
}

// Updates the amplitude
void update_amplitude(double amp) {
  if(amp >= 20 && amp <= 70) {
    amplitude = amp;
  }
}

// Updates the wavelength
void update_wavelength(double wl) {
  if(wl >= 0 && wl <= 3) {
    wavelength = wl;
  }
}

// Updates the frequency
void update_frequency(double f) {
  if(f >= 0.5 && f <= 12) {
    frequency = f;
  }
}

// Updates the offset
void update_offset(double off) {
  if(off >= -10 && off <= 10) {
    offset = off;
  }
}

void update_direction(direction d) {
  if(d == FORWARD || d == BACKWARD) {
    dir_snake = d;
  }
}

void update_motion(motion mo) {
  motion_snake = mo;

  if(mo == CONCERTINA || mo == INCHWORM) {
    dir_snake = FORWARD;
  }
}

// This function resets the snake
void reset() {
  dir_snake = NO_MOVE;
  frequency = DEFAULT_FREQ;
  wavelength = DEFAULT_WL;
  offset = DEFAULT_OFF;  
  amplitude = DEFAULT_AMP;
  speed_inchworm = DEFAULT_SPEED_INCH;
  straight();
}


// -------------------------------------------------------------------------------------
// SETUP FUNCTION
// -------------------------------------------------------------------------------------
void setup() {  

  Serial.begin(9600); 
  Serial.println("INIT SNAKE FLIPPER");

  Serial.print("WIFI ...");
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wifi...");
  Serial.print("\n");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("Wifi connected");
  Serial.println(WiFi.localIP());

  
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

  server.on("/mode", HTTP_POST, [](AsyncWebServerRequest *request){
    if(request->hasParam("value", true)) {
      AsyncWebParameter* p = request->getParam("value", true);
      int value = p->value().toInt();

      update_mode(value);
      request->send(200, "text/html", "good"); 

    } else {
      request->send(404, "text/html", "Error mode"); 
    }
  });

  server.on("/motion", HTTP_POST, [](AsyncWebServerRequest *request){
    if(request->hasParam("value", true)) {
      AsyncWebParameter* p = request->getParam("value", true);
      int value = p->value().toInt();

      if(value == 1) {
        update_motion(UNDULATED);
      } else if(value == 0) {
        update_motion(CONCERTINA);
      } else if(value == 2) {
        update_motion(INCHWORM);
      }
      request->send(200, "text/html", "good"); 
    } else {
      request->send(404, "text/html", "Error motion"); 
    }
  });

  server.on("/params", HTTP_POST, [](AsyncWebServerRequest *request){
    if(request->hasParam("amp", true)) {
      AsyncWebParameter* p = request->getParam("amp", true);
      double value = p->value().toInt();
      update_amplitude(value);

      request->send(200, "text/html", "good"); 

    } else if(request->hasParam("wl", true)) {
      AsyncWebParameter* p = request->getParam("wl", true);
      double value = p->value().toInt();
      update_wavelength(value);

      request->send(200, "text/html", "good"); 

    } else if(request->hasParam("freq", true)) {
      AsyncWebParameter* p = request->getParam("freq", true);
      double value = p->value().toInt();
      update_frequency(value);

      request->send(200, "text/html", "good"); 

    } else if(request->hasParam("speed", true)) {
      AsyncWebParameter* p = request->getParam("speed", true);
      double value = p->value().toInt();
      update_speed_inchworm(value);

      request->send(200, "text/html", "good"); 

    } else if(request->hasParam("offset", true)) {
      AsyncWebParameter* p = request->getParam("offset", true);
      double value = p->value().toInt();
      update_offset(value);

      request->send(200, "text/html", "good"); 

    } else if(request->hasParam("off", true)) {
      AsyncWebParameter* p = request->getParam("off", true);
      double value = p->value().toInt();

      int off = 0;
      if(value <= 180) {
        off = map(value, 0, 180, -11, 11);
        if(off != offset) {
          update_offset(off);
        }
        request->send(200, "text/html", String(off)); 
      } else {
        request->send(200, "text/html", "nothing"); 
      }
    } else {
      request->send(404, "text/html", "baaaaaaaaaad"); 
    }
  });

  server.on("/direction", HTTP_POST, [](AsyncWebServerRequest *request){
        
    if(request->hasParam("value", true)) {
      AsyncWebParameter* p = request->getParam("value", true);
      int value = p->value().toInt();

      if(value == 1) {
        update_direction(FORWARD);
      } else if(value == 0) {
        update_direction(BACKWARD);
      } 

      request->send(200, "text/html", "ok direction");
    } else {
      request->send(404, "text/html", "Error direction"); 
    }
  });

  server.begin();

  driver.begin();
  driver.wakeup();
  driver.setPWMFreq(FREQUENCY_SERVO); // which frequency of our servos

  // Initialize all servo at their midpoint
  straight();

  delay(2000);
}

// -------------------------------------------------------------------------------------
// LOOP FUNCTION
// -------------------------------------------------------------------------------------
void loop() {
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wifi disconnected");
    WiFi.disconnect();
    delay(1000);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("Wifi reconnected");
    server.begin();
  }

  if(is_running == 1) {
    switch(motion_snake){

      case CONCERTINA:
        concertina_motion();
        if(even == 1) {
          even = 0;
        } else {
          even = 1;
        }
        break;

      case INCHWORM:
        inchworm_motion();
        break;

      case UNDULATED:
        undulated_motion();
        break;

      case NONE:
        is_running = 0;
        break;  

      default:
        break;    
    } 
  } 
 
}


















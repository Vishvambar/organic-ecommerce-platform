class student :
    def __init__ (self,name,roll):
        self.name=name
        self.roll=roll

    def display(self):
        print(f"Name :{self.name} \n Roll no:{self.roll}")

s1= student("Vishu",18)
s1.display();    
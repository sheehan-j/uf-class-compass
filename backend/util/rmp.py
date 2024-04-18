import ratemyprofessor
import sys
import json

professor_name = sys.argv[1]
# professor_name = "Albert Ritzhaupt"

professor = ratemyprofessor.get_professor_by_school_and_name(
    ratemyprofessor.get_school_by_name("University of Florida"), professor_name)

if professor is not None and professor.school.name == "University of Florida" and professor.name == professor_name:
  print(professor.id)
  print(professor.department)
  print(professor.school.name)
  print(professor.rating)
  print(professor.difficulty)
  print(professor.num_ratings)
  if professor.would_take_again is not None:
      print(round(professor.would_take_again, 1))
  else:
      print("N/A")
else:
  print("null")
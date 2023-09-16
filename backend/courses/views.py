from django.shortcuts import render

from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics

from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404

from .models import Course, CourseCategory
from api.models import AppUser
from .serializers import DetailCourseSerializer, ListCourseSerializer, CreateCourseSerializer

# class CourseList(generics.GenericAPIView):
#     queryset = Course.objects.all()
#     serializer_class = AbstractCourseSerializer
#     detail_serializer_class = DetailCourseSerializer

#     def get_serializer_class(self):
#         if 'pk' in self.kwargs:
#             return self.detail_serializer_class
#         return self.serializer_class

#     # Create course
#     def post(self, request):


#         serializer = CourseCreateSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save(author=request.user)
            
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     # Retrieve a single course by ID or all courses without specifying an ID
#     def get(self, request, pk=None):

#         print(request.user)



#         # Determining user subscription status
#         isSubscriber = len(Course.objects.filter(subscribers=request.user)) > 0
        
#         if pk is None:
#             # Course manager permission grants unrestricted course access
#             if request.user.course_manager:
#                 queryset = Course.objects.all()
#                 return Response(serializer.data)

#             # Initializing the query
#             queryset = Course.objects.filter(available_for_everyone=True)

#             # For subscribers, courses that are available and those that are individually subscribed to are included
#             if isSubscriber:
#                 queryset |= (
#                     Course.objects.filter(available_for_any_subscriber=True) |
#                     Course.objects.filter(available_for_buyers_only=True, subscribers=request.user)
#                 )

            
#             serializer = AbstractCourseSerializer(queryset, many=True)
#             return Response(serializer.data)
        

#         course = get_object_or_404(Course, course_id=pk)
#         serializer = CourseSerializer(course)
        
#         # If the course is open to all, user is a course manager,
#         # the course is accessible to subscribers and user is subscribed,
#         # course is available to buyers and user bought the course,
#         # data is returned
#         if (course.available_for_everyone
#                 or request.user.course_manager
#                 or (course.available_for_any_subscriber and isSubscriber)
#                 or (course.available_for_buyers_only and (request.user in course.subscribers.all()))):
#             return Response(serializer.data)


#         # When none of the conditions is met, 404 status is returned
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     # # Updating specified course data by id
#     # def put(self, request, pk):
#     #     course = get_object_or_404(Course, course_id=pk)
#     #     serializer = CourseCreateSerializer(course, data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     # # Deleting specified course by id
#     # def delete(self, request, pk):
#     #     course = get_object_or_404(Course, course_id=pk)
#     #     course.delete()
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
    

class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = ListCourseSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateCourseSerializer
        return super().get_serializer_class()
    
    def get_queryset(self):
        user = self.request.user
        contributed_courses = user.contributed_courses.all()
        subscribed_courses = user.subscribed_courses.all()
        created_courses = user.created_courses.all()


        queryset = Course.objects.filter(available_for_everyone=True) | contributed_courses | subscribed_courses | created_courses

        return queryset

course_list_view = CourseListView.as_view()


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = DetailCourseSerializer

course_detail_view = CourseDetailView.as_view()

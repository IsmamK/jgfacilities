import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import *
# Utility functions

# Remove all cache-related imports and functions

def write_to_db(model_name, data):
    """
    Write JSON data to the database.
    """
    component, created = ComponentData.objects.get_or_create(name=model_name)
    component.data = data
    component.save()

@method_decorator(csrf_exempt, name='dispatch')
class JsonDBView(View):
    model_name = None  # Override this in subclasses

    def get(self, request):
        try:
            component = ComponentData.objects.get(name=self.model_name)
            data = component.data
            return JsonResponse(data, safe=False)
        except ComponentData.DoesNotExist:
            return JsonResponse({"error": f"{self.model_name} does not exist in the database"}, status=404)

    def patch(self, request):
        updated_data = json.loads(request.body)
        try:
            component = ComponentData.objects.get(name=self.model_name)
            existing_data = component.data

            if isinstance(existing_data, list) and isinstance(updated_data, list):
                existing_data = updated_data
            elif isinstance(existing_data, dict) and isinstance(updated_data, dict):
                existing_data.update(updated_data)
            else:
                return JsonResponse({"error": "Invalid data format"}, status=400)

            write_to_db(self.model_name, existing_data)
            return JsonResponse(existing_data, safe=False)
        except ComponentData.DoesNotExist:
            return JsonResponse({"error": f"{self.model_name} does not exist in the database"}, status=404)

    def put(self, request):
        new_data = json.loads(request.body)
        write_to_db(self.model_name, new_data)
        return JsonResponse(new_data, safe=False)

## Specific Views for Each Component Using the Database
class CarouselView(JsonDBView):
    model_name = 'carousel_data'

class NavbarView(JsonDBView):
    model_name = 'navbar_data'

class FooterView(JsonDBView):
    model_name = 'footer_data'

class HeroView(JsonDBView):
    model_name = 'hero_data'

class CardsView(JsonDBView):
    model_name = 'cards_data'

class ServicesView(JsonDBView):
    model_name = 'services_data'

class StatisticsView(JsonDBView):
    model_name = 'statistics_data'

class GridCardsView(JsonDBView):
    model_name = 'grid_cards_data'

class WhyUsView(JsonDBView):
    model_name = 'why_us_data'

class OurClientsView(JsonDBView):
    model_name = 'our_clients_data'

class AssociatesView(JsonDBView):
    model_name = 'associates_data'

class NewsView(JsonDBView):
    model_name = 'news_data'

class ContactView(JsonDBView):
    model_name = 'contact_data'

class LocationView(JsonDBView):
    model_name = 'location_data'

class FeaturedVideoView(JsonDBView):
    model_name = 'featured_video_data'

# About Component Views
class About1View(JsonDBView):
    model_name = 'about1_data'

class About2View(JsonDBView):
    model_name = 'about2_data'

class FaqView(JsonDBView):
    model_name = 'faq_data'

class MessageView(JsonDBView):
    model_name = 'message_data'

class TeamView(JsonDBView):
    model_name = 'team_data'

# Contact Component Views
class Contact1View(JsonDBView):
    model_name = 'contact1_data'

class Contact2View(JsonDBView):
    model_name = 'contact2_data'

# Services Page View
class ServicesPageView(JsonDBView):
    model_name = 'services_page_data'

# Projects View
class ProjectsView(JsonDBView):
    model_name = 'projects_data'

# Gallery View
class GalleryView(JsonDBView):
    model_name = 'gallery_data'

def get_service_slugs(request):
    try:
        data = ComponentData.objects.get(name="services_page_data").data
        result = [{'slug': data['slug'], 'title': data['title']} for data in data]
        return JsonResponse(result, safe=False)
    except ComponentData.DoesNotExist:
        return JsonResponse({"error": "services_page_data does not exist in the database"}, status=404)

from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageListCreate(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactMessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

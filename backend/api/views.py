import os
import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.utils.cache import get_cache_key

# Utility functions

def invalidate_cache_page(request):
    """
    Invalidates the cache for a specific view created by cache_page.
    """
    cache_key = get_cache_key(request)
    if cache_key:
        cache.delete(cache_key)

def read_json_file(file_path):
    """
    Reads JSON data from a file.
    """
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        return {"error": str(e)}

def write_json_file(file_path, data):
    """
    Writes JSON data to a file.
    """
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def get_or_set_cache(key, file_path, timeout=None):
    """
    Retrieve data from cache if available, otherwise read from file and cache it.
    """
    data = cache.get(key)
    print("got from cache")
    if not data:
        data = read_json_file(file_path)
        if not isinstance(data, dict) or "error" not in data:
            print("didnt get from cash so had to set to cash")
            cache.set(key, data, timeout)
    return data

# Base View for JSON File Operations
@method_decorator(csrf_exempt, name='dispatch')
class JsonFileView(View):
    file_path = None  # Override this in subclasses
    cache_key = None  # Override this in subclasses

    @method_decorator(cache_page(60*60*24*365*10))  # Cache for 10 years (effectively never expiring)
    def get(self, request):
        data = get_or_set_cache(self.cache_key, self.file_path)
        return JsonResponse(data, safe=False)

    def patch(self, request):
        existing_data = read_json_file(self.file_path)
        updated_data = json.loads(request.body)

        if isinstance(existing_data, list) and isinstance(updated_data, list):
            # For lists, replace the data entirely
            existing_data = updated_data
        elif isinstance(existing_data, dict) and isinstance(updated_data, dict):
            # For dictionaries, update the data
            existing_data.update(updated_data)
        else:
            return JsonResponse({"error": "Invalid data format"}, status=400)

        # Write the updated data to the file
        write_json_file(self.file_path, existing_data)

        # Clear the cache to ensure the updated data is fetched next time
        invalidate_cache_page(request)
        cache.delete(self.cache_key)

        return JsonResponse(existing_data, safe=False)


    def put(self, request):
        new_data = json.loads(request.body)
        write_json_file(self.file_path, new_data)
        invalidate_cache_page(request)
        cache.delete(self.cache_key)
        return JsonResponse(new_data, safe=False)


# Define specific views for each component
class CarouselView(JsonFileView):
    file_path = 'api/data/home_data/carousel.json'
    cache_key = 'carousel_data'

class NavbarView(JsonFileView):
    file_path = 'api/data/layout_data/navbar.json'
    cache_key = 'navbar_data'

class FooterView(JsonFileView):
    file_path = 'api/data/layout_data/footer.json'
    cache_key = 'footer_data'

class HeroView(JsonFileView):
    file_path = 'api/data/home_data/hero.json'
    cache_key = 'hero_data'

class CardsView(JsonFileView):
    file_path = 'api/data/home_data/cards.json'
    cache_key = 'cards_data'

class ServicesView(JsonFileView):
    file_path = 'api/data/home_data/services.json'
    cache_key = 'services_data'

class StatisticsView(JsonFileView):
    file_path = 'api/data/home_data/statistics.json'
    cache_key = 'statistics_data'

class GridCardsView(JsonFileView):
    file_path = 'api/data/home_data/grid_cards.json'
    cache_key = 'grid_cards_data'

class WhyUsView(JsonFileView):
    file_path = 'api/data/home_data/why_us.json'
    cache_key = 'why_us_data'

class OurClientsView(JsonFileView):
    file_path = 'api/data/home_data/our_clients.json'
    cache_key = 'our_clients_data'

class AssociatesView(JsonFileView):
    file_path = 'api/data/home_data/associates.json'
    cache_key = 'associates_data'

class NewsView(JsonFileView):
    file_path = 'api/data/home_data/news.json'
    cache_key = 'news_data'

class ContactView(JsonFileView):
    file_path = 'api/data/home_data/contact.json'
    cache_key = 'contact_data'

class LocationView(JsonFileView):
    file_path = 'api/data/home_data/location.json'
    cache_key = 'location_data'

class FeaturedVideoView(JsonFileView):
    file_path = 'api/data/home_data/featured_video.json'
    cache_key = 'featured_video_data'

# About Component Views
class About1View(JsonFileView):
    file_path = 'api/data/about_data/about1.json'
    cache_key = 'about1_data'

class About2View(JsonFileView):
    file_path = 'api/data/about_data/about2.json'
    cache_key = 'about2_data'

class FaqView(JsonFileView):
    file_path = 'api/data/about_data/faq.json'
    cache_key = 'faq_data'

class MessageView(JsonFileView):
    file_path = 'api/data/about_data/message.json'
    cache_key = 'message_data'

class TeamView(JsonFileView):
    file_path = 'api/data/about_data/team.json'
    cache_key = 'team_data'

# Contact Component Views
class Contact1View(JsonFileView):
    file_path = 'api/data/contact_data/contact1.json'
    cache_key = 'contact1_data'

class Contact2View(JsonFileView):
    file_path = 'api/data/contact_data/contact2.json'
    cache_key = 'contact2_data'

# Services Page View
class ServicesPageView(JsonFileView):
    file_path = 'api/data/services_data/services.json'
    cache_key = 'services_page_data'

# Projects View
class ProjectsView(JsonFileView):
    file_path = 'api/data/project_data/projects.json'
    cache_key = 'projects_data'

# Gallery View
class GalleryView(JsonFileView):
    file_path = 'api/data/gallery_data/gallery.json'
    cache_key = 'gallery_data'

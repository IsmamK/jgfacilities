import json
import os
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
import re
# Helper function to read JSON files
def read_json_file(file_path):
    with open(file_path) as f:

        return json.load(f)

# Helper function to write to JSON files
def write_json_file(file_path, data):
    with open(file_path, 'w') as f:
     
        json.dump(data, f, indent=4)


# Views for each component

# ------------------------------------- HOME COMPONENTS -------------------------------------------------------------------

from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

# Helper function to read JSON files
def read_json_file(file_path):
    try:
        with open(file_path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        return {"error": str(e)}

# Helper function to write to JSON files
def write_json_file(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

# Template for Home Component Views
class CarouselView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/carousel.json')
        return JsonResponse(data,safe=False)

    def patch(self, request):
        data = read_json_file('api/data/home_data/carousel.json')
        updated_data = json.loads(request.body)['images']
        
    # Check if both data and updated_data are lists
        if isinstance(data, list) and isinstance(updated_data, list):
            data = updated_data  # Replace the entire list with the new list
        else:
            return JsonResponse({"error": "Invalid data format"}, status=400)

   
        write_json_file('api/data/home_data/carousel.json', data)
        return JsonResponse(data,safe=False)
    
class NavbarView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/layout_data/navbar.json')                
        return JsonResponse(data,safe=False)

    def patch(self, request):
        data = read_json_file('api/data/layout_data/navbar.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/layout_data/navbar.json', data)
        return JsonResponse(data,safe=False)

class FooterView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/layout_data/footer.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/layout_data/footer.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/layout_data/footer.json', data)
        return JsonResponse(data)
        
class HeroView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/hero.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/hero.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/hero.json', data)
        return JsonResponse(data)

class CardsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/cards.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/cards.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/cards.json', data)
        return JsonResponse(data)

class ServicesView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/services.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/services.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/services.json', data)
        return JsonResponse(data)

class StatisticsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/statistics.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/statistics.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/statistics.json', data)
        return JsonResponse(data)

class GridCardsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/grid_cards.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/grid_cards.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/grid_cards.json', data)
        return JsonResponse(data)

class WhyUsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/why_us.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/why_us.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/why_us.json', data)
        return JsonResponse(data)

class OurClientsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/our_clients.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/our_clients.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/our_clients.json', data)
        return JsonResponse(data)

class NewsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/news.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/news.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/news.json', data)
        return JsonResponse(data)

class ContactView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/contact.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/contact.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/contact.json', data)
        return JsonResponse(data)

class LocationView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/location.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/location.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/location.json', data)
        return JsonResponse(data)

class FeaturedVideoView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/home_data/featured_video.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/home_data/featured_video.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/home_data/featured_video.json', data)
        return JsonResponse(data)
    
# ------------------------------------------------ ABOUT COMPONENTS ------------------------------------------------ 
class About1View(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/about_data/about1.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/about_data/about1.json')
        updated_data = json.loads(request.body)

        print(updated_data)
  

        data.update(updated_data)
        write_json_file('api/data/about_data/about1.json', data)
        return JsonResponse(data)


class About2View(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/about_data/about2.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/about_data/about2.json')
        updated_data = json.loads(request.body)
       



        data.update(updated_data)
        write_json_file('api/data/about_data/about2.json', data)
        return JsonResponse(data)

class FaqView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/about_data/faq.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/about_data/faq.json')
        updated_data = json.loads(request.body)
        data.update(updated_data)
        write_json_file('api/data/about_data/faq.json', data)
        return JsonResponse(data)

class TeamView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/about_data/team.json')
        return JsonResponse(data,safe=False)

    def patch(self, request):
        data = read_json_file('api/data/about_data/team.json')
        updated_data = json.loads(request.body)

        

        data.update(updated_data)
        write_json_file('api/data/about_data/team.json', data)
        return JsonResponse(data,safe=False)

# ------------------------------------------------  CONTACT COMPONENTS ------------------------------------------------ 
class Contact1View(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/contact_data/contact1.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/contact_data/contact1.json')
        updated_data = json.loads(request.body)

        

        data.update(updated_data)
        write_json_file('api/data/contact_data/contact1.json', data)
        return JsonResponse(data)

# Contact2View Class
class Contact2View(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/contact_data/contact2.json')
        return JsonResponse(data)

    def patch(self, request):
        data = read_json_file('api/data/contact_data/contact2.json')
        updated_data = json.loads(request.body)

       

        data.update(updated_data)
        write_json_file('api/data/contact_data/contact2.json', data)
        return JsonResponse(data)
    
# ------------------------ Services  ------------------

class ServicesPageView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/services_data/services.json')
        return JsonResponse(data, safe=False)

    def patch(self, request):
        # Read existing data
        data = read_json_file('api/data/services_data/services.json')
        # Parse incoming patch request data
        updated_data = json.loads(request.body)
        
        data = updated_data
        data = write_json_file('api/data/services_data/services.json',data)
        return JsonResponse(data,safe=False)

    


    def put(self, request):
           # Read existing data
        data = read_json_file('api/data/services_data/services.json')
        # Parse incoming patch request data
        updated_data = json.loads(request.body)
        
        data = updated_data
        data = write_json_file('api/data/services_data/services.json',data)
        return JsonResponse(data,safe=False)


# ------------------------ PROJECTS  ------------------

class ProjectsView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = read_json_file('api/data/project_data/projects.json')
        return JsonResponse(data, safe=False)

    def patch(self, request):
        data = read_json_file('api/data/project_data/projects.json')
        updated_data = json.loads(request.body)


        data.update(updated_data)
        write_json_file('api/data/project_data/projects.json', data)
        return JsonResponse(data, safe=False)
    
# ------------------------------------------------ GALLERY ------------------------------------------------ 

class GalleryView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        # Read data from the gallery JSON file
        data = read_json_file('api/data/gallery_data/gallery.json')
        return JsonResponse(data)

    def patch(self, request):
        # Read the existing data from the gallery JSON file
        data = read_json_file('api/data/gallery_data/gallery.json')
        updated_data = json.loads(request.body)


        # Update the existing data with the new data
        data.update(updated_data)
        write_json_file('api/data/gallery_data/gallery.json', data)
        return JsonResponse(data)

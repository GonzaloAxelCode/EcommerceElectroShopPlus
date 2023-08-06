from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.cart.models import Cart, CartItem


from apps.product.models import Product
from apps.product.serializers import ProductSerializer


class GetItemView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.order_by("product").filter(cart=cart)
            result = []

            for cart_item in cart_items:
                item = {}
                item["id"] = cart_item.id
                item["count"] = cart_item.count
                product = Product.objects.get(id=cart_item.product.id)
                product = ProductSerializer(product)
                item["product"] = product.data
                result.append(item)

            return Response({"cart": result}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Somthing went wrong when retriving cart items"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddItemView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data["product_id"])
        except:
            return Response({"error": "ID product not found"}, status=status.HTTP_400_BAD_REQUEST)
        count = 1

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response({"error": "Product not found"}, status=status.HTTP_400_BAD_REQUEST)
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)
            if CartItem.objects.filter(cart=cart, product=product).exists():

                return Response({"error": "error no existe en el carrito"}, status=status.HTTP_400_BAD_REQUEST)

            if int(product.quantity) > 0:
                CartItem.objects.create(
                    product=product, cart=cart, count=count)
                if CartItem.objects.filter(cart=cart, product=product).exists():
                    total_items = int(cart.total_items) + 1
                    Cart.objects.filter(user=user).update(
                        total_items=total_items)

                    cart_items = CartItem.objects.order_by(
                        "product").filter(cart=cart)
                    result = []

                    for cart_item in cart_items:
                        item = {}
                        item["id"] = cart_item.id
                        item["count"] = cart_item.count
                        product = Product.objects.get(id=cart_item.product.id)
                        product = ProductSerializer(product)
                        item["product"] = product.data
                        result.append(item)

                    return Response({"cart": result}, status=status.HTTP_201_CREATED)
                else:

                    return Response({"warnning": "Producto agotado"}, status=status.HTTP_200_OK)

        except:
            return Response({'error': 'Something went wrong when adding item to cart'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)
            total_cost = 0.0
            total_cost_compare = 0.0

            if cart_items.exists():
                for cart_item in cart_items:
                    total_cost += float(cart_item.product.price) * \
                        float(cart_item.count)
                    total_cost_compare += float(
                        cart_item.product.compare_price) * float(cart_item.count)
                total_cost = round(total_cost, 2)
                total_cost_compare = round(total_cost_compare, 2)
            return Response({"total_cost": total_cost, "total_cost_compare": total_cost_compare}, status=status.HTTP_200_OK)
        except:

            return Response(
                {'error': 'Something went wrong when retrieving total costs'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetItemTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            total_items = cart.total_items
            return Response({"total_items": total_items, }, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when getting total number of items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateItemView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            count = int(data['count'])
        except:
            return Response(
                {'error': 'Count value must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)

            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'This product is not in your cart'},
                    status=status.HTTP_404_NOT_FOUND)

            quantity = product.quantity

            if count <= quantity:
                CartItem.objects.filter(
                    product=product, cart=cart
                ).update(count=count)

                cart_items = CartItem.objects.order_by(
                    'product').filter(cart=cart)

                result = []

                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

                return Response({'cart': result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Not enough of this item in stock'},
                    status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when updating cart item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)

            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'This product is not in your cart'},
                    status=status.HTTP_404_NOT_FOUND)

            CartItem.objects.filter(cart=cart, product=product).delete()

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                # actualizar numero total en el carrito
                total_items = int(cart.total_items) - 1
                Cart.objects.filter(user=user).update(total_items=total_items)

            cart_items = CartItem.objects.order_by('product').filter(cart=cart)

            result = []

            if CartItem.objects.filter(cart=cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

            return Response({'cart': result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when removing item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmptyCartView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        try:
            cart = Cart.objects.get(user=user)
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Cart not found'},
                    status=status.HTTP_404_NOT_FOUND)

            CartItem.objects.filter(cart=cart).delete()
            Cart.objects.filter(user=user).update(total_items=0)

            return Response(
                {'success': 'Cart emptied successfully'},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'success': 'Cart emptied successfully'},
                status=status.HTTP_200_OK)


class SyncCartView(APIView):
    def put(self, requets, format=None):
        user = self.request.user
        data = self.request.data

        try:
            cart_items = data["cart_items"]

            for cart_item in cart_items:
                cart = Cart.objects.get(user=user)
                try:
                    product_id = int(cart_item["product_id"])
                except:
                    return Response(
                        {'error': 'Product ID must be an integer'},
                        status=status.HTTP_404_NOT_FOUND)

                if not Product.objects.filter(id=product_id).exists():
                    return Response(
                        {'error': 'Product with this ID does not exist'},
                        status=status.HTTP_404_NOT_FOUND)

                product = Product.objects.filter(id=product_id)
                quantity = product.qunatity

                if CartItem.objects.get(cart=cart, product=product).exists():
                    item = CartItem.objects.get(cart=cart, product=product)
                    # count actual
                    count_actual = item.count

                    try:

                        cart_item_count = int(cart_item["count"])
                    except:
                        cart_item_count = 1
                    # check to database
                    if (cart_item_count + int(count_actual)) <= int(quantity):
                        update_count = cart_item_count + int(count_actual)
                        CartItem.objects.filter(
                            cart=cart, product=product).update(count=update_count)

                else:
                    # entonces si  no hay el producto en el cart
                    try:
                        cart_item_count = int(cart_item["count"])
                    except:
                        cart_item_count = 1

                    if cart_item_count <= quantity:
                        CartItem.objects.create(
                            product=product, cart=cart, count=cart_item_count
                        )
                        if CartItem.objects.filter(cart=cart, product=product).exists():
                            # Sumar item
                            total_items = int(cart.total_items) + 1
                            Cart.objects.filter(user=user).update(
                                total_items=total_items
                            )
                return Response(
                    {'success': 'Cart Synchronized'},
                    status=status.HTTP_201_CREATED)
        except:
            return Response(
                {'error': 'Something went wrong when synching cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

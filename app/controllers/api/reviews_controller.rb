class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render :index
  end

  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render :create
    else
      flash[:errors] = @review.errors.full_messages
    end
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def update
    @review = Review.find(params[:review][:id])

    if @review.update(rating: params[:review][:rating], comment: params[:review][:comment])
      render :update
    else
      render json: @review.errors.full_messages
    end
  end

  def destroy

  end

  private
  def review_params
    params.require(:review).permit(:rating, :comment, :spot_id)
  end
end

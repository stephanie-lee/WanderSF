class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render :index
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render :show
    else
      flash[:errors] = @tag.errors.full_messages
    end
  end

  def show
    @tag = Tag.find(params[:id])
    render :show
  end

private
  def tag_params
    params.require(:tag).permit(:name)
  end
end
